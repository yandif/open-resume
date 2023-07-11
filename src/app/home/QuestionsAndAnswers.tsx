const QAS = [
  {
    question: "Q1. 什么是简历生成器？为什么简历生成器比简历模板文档更好？",
    answer: (
      <>
        <p>
          有两种方法可以创建简历。一种方法是使用简历模板，例如办公室/谷歌文档，并根据您的需求进行自定义。另一种方法是使用简历生成器，这是一种在线工具，允许您输入信息并自动生成简历。
        </p>
        <p>
          使用简历模板需要进行手动格式化工作，例如复制和粘贴文本部分以及调整间距，这可能是耗时和容易出错的。很容易遇到格式问题，例如在复制和粘贴后使用不同的符号或字体样式。另一方面，像
          OpenResume
          这样的简历生成器通过自动排版来节省时间并防止格式错误。它还提供了轻松更改字体类型或大小的便利。简而言之，与简历模板相比，简历生成器更易于使用。
        </p>
      </>
    ),
  },
];

export const QuestionsAndAnswers = () => {
  return (
    <section className="mx-auto max-w-3xl divide-y divide-gray-300 lg:mt-4 lg:px-2">
      <h2 className="text-center text-3xl font-bold">问答</h2>
      <div className="mt-6 divide-y divide-gray-300">
        {QAS.map(({ question, answer }) => (
          <div key={question} className="py-6">
            <h3 className="font-semibold leading-7">{question}</h3>
            <div className="mt-3 grid gap-2 leading-7 text-gray-600">
              {answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
