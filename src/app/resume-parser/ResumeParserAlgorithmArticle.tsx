import { isBold } from "lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import {
  Badge,
  Heading,
  Link,
  Paragraph,
  Table,
} from "components/documentation";
import type {
  Line,
  Lines,
  ResumeSectionToLines,
  TextItem,
  TextItems,
  TextScores,
} from "lib/parse-resume-from-pdf/types";
import { extractProfile } from "lib/parse-resume-from-pdf/extract-resume-from-sections/extract-profile";

export const ResumeParserAlgorithmArticle = ({
  textItems,
  lines,
  sections,
}: {
  textItems: TextItems;
  lines: Lines;
  sections: ResumeSectionToLines;
}) => {
  const getBadgeContent = (item: TextItem) => {
    const X1 = Math.round(item.x);
    const X2 = Math.round(item.x + item.width);
    const Y = Math.round(item.y);
    let content = `X₁=${X1} X₂=${X2} Y=${Y}`;
    if (X1 === X2) {
      content = `X=${X2} Y=${Y}`;
    }
    if (isBold(item)) {
      content = `${content} Bold`;
    }
    if (item.hasEOL) {
      content = `${content} NewLine`;
    }
    return content;
  };
  const step1TextItemsTable = [
    ["#", "文字内容", "元信息"],
    ...textItems.map((item, idx) => [
      idx + 1,
      item.text,
      <Badge key={idx}>{getBadgeContent(item)}</Badge>,
    ]),
  ];

  const step2LinesTable = [
    ["行", "行内容"],
    ...lines.map((line, idx) => [
      idx + 1,
      line.map((item, idx) => (
        <span key={idx}>
          {item.text}
          {idx !== line.length - 1 && (
            <span className="select-none font-extrabold text-sky-400">
              &nbsp;&nbsp;{"|"}&nbsp;&nbsp;
            </span>
          )}
        </span>
      )),
    ]),
  ];

  const { profile, profileScores } = extractProfile(sections);
  const Scores = ({ scores }: { scores: TextScores }) => {
    return (
      <>
        {scores
          .sort((a, b) => b.score - a.score)
          .map((item, idx) => (
            <span key={idx} className="break-all">
              <Badge>{item.score}</Badge> {item.text}
              <br />
            </span>
          ))}
      </>
    );
  };
  const step4ProfileFeatureScoresTable = [
    ["简历属性", "文本（最高特征分数）", "其他文本的特征分数"],
    ["姓名", profile.name, <Scores key={"Name"} scores={profileScores.name} />],
    [
      "邮箱",
      profile.email,
      <Scores key={"Email"} scores={profileScores.email} />,
    ],
    [
      "手机号",
      profile.phone,
      <Scores key={"Phone"} scores={profileScores.phone} />,
    ],
  ];

  return (
    <article className="mt-10">
      <Heading className="text-primary !mt-0 border-t-2 pt-8">
        简历解析算法深度解析
      </Heading>
      <Paragraph smallMarginTop={true}>
        对于技术上感兴趣的人，本节将深入介绍 OpenResume
        解析器算法，并介绍其工作原理的四个步骤。请注意，该算法专门用于解析英语语言的单列简历。
      </Paragraph>
      {/* Step 1. Read the text items from a PDF file */}
      <Heading level={2}>第一步，从 PDF 文件中读取文本项。</Heading>
      <Paragraph smallMarginTop={true}>
        PDF 文件是由
        <Link href="https://www.iso.org/standard/51502.html">
          {" "}
          ISO 32000 规范
        </Link>
        定义的标准文件格式。
      </Paragraph>
      <Paragraph>
        虽然有可能编写遵循 ISO 32000 规范的自定义 PDF
        阅读器函数，但使用现有的库要简单得多。在这种情况下，简历解析器使用
        Mozilla 的开源
        <Link href="https://github.com/mozilla/pdf.js"> pdf.js</Link>
        库首先提取文件中的所有文本项。
      </Paragraph>
      <Paragraph>
        下表列出了从添加的简历 PDF 中提取的 {textItems.length}{" "}
        个文本项。一个文本项包含文本内容以及一些关于内容的元数据，例如其在文档中的
        x、y 位置、字体是否加粗或是否开始新行。（请注意，x、y
        位置相对于页面左下角，即原点为 0,0）
      </Paragraph>
      <div className="mt-4 max-h-72 overflow-y-scroll border scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-200 scrollbar-w-3">
        <Table
          table={step1TextItemsTable}
          className="!border-none"
          tdClassNames={["", "", "md:whitespace-nowrap"]}
        />
      </div>
      {/* Step 2. Group text items into lines */}
      <Heading level={2}>第二步，将文本项分组成行。</Heading>
      <Paragraph smallMarginTop={true}>
        提取出的文本项还不可用，并存在两个主要问题：
      </Paragraph>
      <Paragraph>
        <span className="mt-3 block font-semibold">
          问题 1：它们存在一些不需要的噪声。
        </span>
        有些单个文本项可能会被分成多个文本项，就像您在上面的表格中观察到的那样，例如电话号码“(123)
        456-7890”可能被分成 3 个文本项“(123) 456”、“-” 和“7890”。
      </Paragraph>
      <Paragraph smallMarginTop={true}>
        <span className="font-semibold">解决方案：</span>
        为了解决这个问题，简历解析器将相邻的文本项连接成一个文本项，如果它们之间的距离小于平均典型字符宽度，其中
        <span
          dangerouslySetInnerHTML={{
            __html: `<math display="block">
                        <mrow>
                            <mn>距离 </mn>
                            <mo>=</mo>
                            <mn>右侧文本项X₁</mn>
                            <mo>-</mo>
                            <mn>左侧文本项X₂</mn>
                        </mrow>
                    </math>`,
          }}
          className="my-2 block text-left text-base"
        />
        平均典型字符宽度通过将所有文本项的宽度之和除以文本项的字符总数计算得出（加粗文本和新行元素被排除在外，以避免结果偏差）。
      </Paragraph>
      <Paragraph>
        <span className="mt-3 block font-semibold">
          问题 2：它们缺乏上下文和关联。
        </span>
        当我们阅读简历时，我们逐行扫描简历。我们的大脑可以通过诸如文本加粗和接近程度等视觉提示来处理每个部分，我们可以将更接近的文本快速关联到一个相关的组。然而，提取出的文本项目前没有这些上下文/关联，它们只是不连贯的元素。
      </Paragraph>
      <Paragraph smallMarginTop={true}>
        <span className="font-semibold">解决方案：</span>{" "}
        为了解决这个问题，简历解析器重构了这些上下文和关联，类似于我们的大脑如何阅读和处理简历。它首先将文本项分组成行，因为我们逐行阅读文本。然后将行分组成部分，这将在下一步中讨论。
      </Paragraph>
      <Paragraph>
        在第二步结束时，简历解析器从添加的简历 PDF 中提取了 {lines.length}{" "}
        行，如下表所示。以行的形式显示结果更易读。（某些行可能有多个文本项，这些文本项由
        <span className="select-none font-extrabold text-sky-400">
          &nbsp;{"|"}&nbsp;
        </span>
        分隔）
      </Paragraph>
      <div className="mt-4 max-h-96 overflow-y-scroll border scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-200 scrollbar-w-3">
        <Table table={step2LinesTable} className="!border-none" />
      </div>
      {/* Step 3. Group lines into sections */}
      <Heading level={2}>第三步，将行分组成每一部分。</Heading>
      <Paragraph smallMarginTop={true}>
        在第二步中，简历解析器通过将文本项分组成行来开始构建文本项的上下文和关联。第三步继续这个过程，通过将行分组成部分来构建更多的关联。
      </Paragraph>
      <Paragraph>
        请注意，每个部分（除了个人资料部分）都以占据整行的部分标题开始。这不仅是在简历中，而且在书籍和博客中都是一种常见的模式。简历解析器使用这个模式将行分组成上面最近的部分标题所在的部分。
      </Paragraph>
      <Paragraph>
        简历解析器应用一些启发式方法来检测部分标题。确定部分标题的主要启发式方法是检查它是否满足以下三个条件：
        <br />
        1. 它是该行中唯一的文本项
        <br />
        2. 它<span className="font-bold">加粗</span>了
        <br />
        3. 它的字母都是大写的
        <br />
      </Paragraph>
      <Paragraph>
        简单地说，如果一个文本项双重强调，既加粗又大写，那么它很可能是简历中的一个部分标题。对于格式良好的简历，这通常是正确的。当然，也可能有例外情况，但在这些情况下使用加粗和大写字母可能不是一个好的选择。
      </Paragraph>
      <Paragraph>
        如果主要的启发式方法不适用，简历解析器还具有备用启发式方法。备用启发式方法主要针对常见简历部分标题关键字列表进行关键字匹配。
      </Paragraph>
      <Paragraph>
        在第三步结束时，简历解析器从简历中识别出部分并将这些行与相应的部分标题分组，如下表所示。请注意，
        <span className="font-bold">部分标题已加粗</span>
        ，并且
        <span className="bg-teal-50">
          与该部分相关联的行使用相同的颜色突出显示。
        </span>
      </Paragraph>
      <Step3SectionsTable sections={sections} />
      {/* Step 4. Extract resume from sections */}
      <Heading level={2}>第四步，从每一部分中提取简历。</Heading>
      <Paragraph smallMarginTop={true}>
        第四步是简历解析过程的最后一步，也是简历解析器的核心，在这一步中，它从各个部分中提取简历信息。
      </Paragraph>
      <Heading level={3}>特征评分系统</Heading>
      <Paragraph smallMarginTop={true}>
        提取引擎的要点是一个特征评分系统。每个要提取的简历属性都有自定义的特征集，其中每个特征集由一个特征匹配函数和一个匹配分数组成（匹配分数可以是正数或负数）。为了计算特定简历属性的文本项的最终特征评分，它将文本项通过所有特征集，并总结匹配特征分数。这个过程针对部分内的所有文本项进行，文本项中计算出的最高特征评分被确定为提取出的简历属性。
      </Paragraph>
      <Paragraph>
        作为演示，下表显示了添加的简历 PDF 的个人资料部分中的 3 个简历属性。
      </Paragraph>
      <Table table={step4ProfileFeatureScoresTable} className="mt-4" />
      {(profileScores.name.find((item) => item.text === profile.name)?.score ||
        0) > 0 && (
        <Paragraph smallMarginTop={true}>
          在添加的简历 PDF 中，简历属性名称可能是 "{profile.name}
          "，因为它的特征分数为
          {profileScores.name.find((item) => item.text === profile.name)?.score}
          ，是个人资料部分所有文本项中最高的特征分数。（某些文本项的特征分数可能为负数，表示它们很可能不是所需的属性）
        </Paragraph>
      )}
      <Heading level={3}>特征集</Heading>
      <Paragraph smallMarginTop={true}>
        解释了特征评分系统后，我们可以更深入地了解如何为简历属性构建特征集。它遵循两个原则：
        <br />
        1. 简历属性的特征集相对于同一部分中的所有其他简历属性进行设计。
        <br />
        2. 简历属性的特征集基于其特征和每个特征的可能性手动制作。
      </Paragraph>
      <Paragraph>
        下表列出了简历属性名称的一些特征集。它包含将名称属性与正特征分数进行匹配的特征函数，以及仅将其他简历属性与负特征分数进行匹配的特征函数。
      </Paragraph>
      <Table
        table={step4NameFeatureSetsTable}
        title="姓名特征集"
        className="mt-4"
      />
      <Heading level={3}>核心特征函数</Heading>
      <Paragraph smallMarginTop={true}>
        每个简历属性都有多个特征集。它们可以在 extract-resume-from-sections
        文件夹下的源代码中找到，我们不会在这里列出它们所有。每个简历属性通常都有一个核心特征函数，可以很好地识别它们，因此我们将在下面列出核心特征函数。
      </Paragraph>
      <Table table={step4CoreFeatureFunctionTable} className="mt-4" />
      <Heading level={3}>特殊情况：子部分</Heading>
      <Paragraph smallMarginTop={true}>
        值得一提的是子部分。对于个人资料部分，我们可以直接将所有文本项传递给特征评分系统。但对于其他部分，例如教育和工作经验，我们必须先将该部分分成子部分，因为该部分可能存在多个学校或工作经验。然后，特征评分系统处理每个子部分以检索每个简历属性并附加结果。
      </Paragraph>
      <Paragraph smallMarginTop={true}>
        简历解析器应用一些启发式方法来检测子部分。确定子部分的主要启发式方法是检查两行之间的垂直线间距是否大于典型行间距
        *
        1.4，因为格式良好的简历通常会在添加下一个子部分之前创建新的空行。如果主要启发式方法不适用，则还有一个后备启发式方法来检查文本项是否加粗。
      </Paragraph>
      <Paragraph>这就是关于 OpenResume 解析器算法的一切 :)</Paragraph>
      <Paragraph>
        作者：<Link href="https://github.com/xitanggg">Xitang</Link>，日期：2023
        年 6 月
      </Paragraph>
    </article>
  );
};

const step4NameFeatureSetsTable = [
  ["特征函数", "特征匹配分数"],
  ["仅包含字母、空格或句点", "+3"],
  ["加粗了", "+2"],
  ["包含所有大写字母", "+2"],
  ["包含 @", "-4（匹配电子邮件）"],
  ["包含数字", "-4（匹配电话号码）"],
  ["包含 ,", "-4（匹配地址）"],
  ["包含 /", "-4（匹配 URL）"],
];
const step4CoreFeatureFunctionTable = [
  ["简历属性", "核心特征函数", "正则表达式"],
  ["姓名", "仅包含字母、空格或句点", "/^[a-zA-Z\\s\\.]+$/"],
  [
    "电子邮件",
    <>
      匹配电子邮件格式 xxx@xxx.xxx
      <br />
      xxx 可以是任何非空格字符
    </>,
    "/\\S+@\\S+\\.\\S+/",
  ],
  [
    "电话",
    <>
      匹配电话格式 (xxx)-xxx-xxxx <br /> () 和 - 是可选的
    </>,
    "/\\(?\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{4}/",
  ],
  [
    "地点",
    <>匹配城市和州的格式 {"City, ST"}</>,
    "/[A-Z][a-zA-Z\\s]+, [A-Z]{2}/",
  ],
  ["网址", "匹配网址格式 xxx.xxx/xxx", "/\\S+\\.[a-z]+\\/\\S+/"],
  ["学校", "包含学校关键字，例如大学、学院、学校", ""],
  ["学位", "包含学位关键字，例如副学士、学士、硕士", ""],
  ["GPA", "匹配 GPA 格式 x.xx", "/[0-4]\\.\\d{1,2}/"],
  [
    "日期",
    "包含与年份、月份、季节或 Present 相关的日期关键字",
    "年份: /(?:19|20)\\d{2}/",
  ],
  ["职称", "包含职称关键字，例如分析师、工程师、实习生", ""],
  ["公司", "加粗或不匹配职称和日期", ""],
  ["项目", "加粗或不匹配日期", ""],
];

const Step3SectionsTable = ({
  sections,
}: {
  sections: ResumeSectionToLines;
}) => {
  const table: React.ReactNode[][] = [["行", "行内容"]];
  const trClassNames = [];
  let lineCounter = 0;
  const BACKGROUND_COLORS = [
    "bg-red-50",
    "bg-yellow-50",
    "bg-orange-50",
    "bg-green-50",
    "bg-blue-50",
    "bg-purple-50",
  ] as const;
  const sectionsEntries = Object.entries(sections);

  const Line = ({ line }: { line: Line }) => {
    return (
      <>
        {line.map((item, idx) => (
          <span key={idx}>
            {item.text}
            {idx !== line.length - 1 && (
              <span className="select-none font-extrabold text-sky-400">
                &nbsp;&nbsp;{"|"}&nbsp;&nbsp;
              </span>
            )}
          </span>
        ))}
      </>
    );
  };

  for (let i = 0; i < sectionsEntries.length; i++) {
    const sectionBackgroundColor = BACKGROUND_COLORS[i % 6];
    const [sectionTitle, lines] = sectionsEntries[i];
    table.push([
      sectionTitle === "profile" ? "" : lineCounter,
      sectionTitle === "profile" ? "PROFILE" : sectionTitle,
    ]);
    trClassNames.push(`${sectionBackgroundColor} font-bold`);
    lineCounter += 1;
    for (let j = 0; j < lines.length; j++) {
      table.push([lineCounter, <Line key={lineCounter} line={lines[j]} />]);
      trClassNames.push(sectionBackgroundColor);
      lineCounter += 1;
    }
  }

  return (
    <div className="mt-4 max-h-96 overflow-y-scroll border scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-200 scrollbar-w-3">
      <Table
        table={table}
        className="!border-none"
        trClassNames={trClassNames}
      />
    </div>
  );
};
