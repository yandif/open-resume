# OpenResume

OpenResume是一个功能强大的开源简历构建器和简历解析器。

OpenResume的目标是为每个人提供免费访问现代专业简历设计的机会，并使任何人都能自信地申请工作。

官方网站：[https://open-resume.com](https://open-resume.com)

支持中文简历创建: [https://open-resume.yandif.com](https://open-resume.yandif.com)
(不支持解析中文简历)
## ⚒️ 简历构建器

OpenResume的简历构建器使用户可以轻松创建现代专业的简历。

![简历构建器演示](https://i.ibb.co/jzcrrt8/resume-builder-demo-optimize.gif)

它具有以下5个核心功能：

| 功能                              | 描述                                                                                                                                                                                                                                 |
|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **1. 实时界面更新** | 当您输入简历信息时，简历PDF将实时更新，因此您可以轻松查看最终输出。 |
| **2. 现代专业的简历设计** | 简历PDF采用现代专业设计，符合美国的最佳实践，并且与Greenhouse和Lever等顶级ATS平台兼容。它会自动格式化字体、大小、边距和项目符号，以确保一致性并避免人为错误。 |
| **3. 注重隐私** | 应用程序仅在您的浏览器上运行，不需要注册，也不会有任何数据离开您的浏览器，因此可以放心处理您的个人数据。（有趣的是：仅在本地运行意味着即使断开互联网，应用程序仍然可以使用。）|
| **4. 从现有简历PDF导入** | 如果您已经有一份现有的简历PDF，您可以选择直接导入它，以便在几秒钟内将您的简历设计更新为现代专业的设计。 |
| **5. 成功的经验记录** | OpenResume的用户已经在Dropbox、Google、Meta等顶级公司中成功获得面试机会和工作邀约。它已被证明是有效的，受到招聘人员和招聘经理的青睐。|

## 🔍 简历解析器

OpenResume的第二个组件是简历解析器。对于已有简历的用户，简历解析器可以帮助测试和确认简历的ATS可读性。

![简历解析器演示](https://i.ibb.co/JvSVwNk/resume-parser-demo-optimize.gif)

您可以在["简历解析器算法深入解析"部分](https://open-resume.com/resume-parser)了解更多关于简历解析器算法的信息。

## 📚 技术栈

| 类别                              | 选择                                                                                                | 描述                                                                                                                                                                                                                                 |
|--------------------------------------|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **语言** | [TypeScript](https://github.com/microsoft/TypeScript) | TypeScript是带有静态类型检查的JavaScript，有助于在代码编写时捕获许多愚蠢的错误。 |
| **UI库** | [React](https://github.com/facebook/react) | React的声明式语法和基于组件的架构使得开发响应式可重用组件变得简单。 |
| **状态管理** | [Redux Toolkit](https://github.com/reduxjs/redux-toolkit) | Redux Toolkit减少了设置和更新中央redux存储器的样板代码，用于管理复杂的简历状态。 |
| **CSS框架** | [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | Tailwind通过提供有用的CSS实用程序来加快开发速度，并消除了在tsx和css文件之间切换的需求。 |
| **Web框架** | [Next.js 13](https://github.com/vercel/next.js) | Next.js支持静态站点生成，并帮助构建支持SEO的高效React网页。 |
| **PDF阅读器** | [PDF.js](https://github.com/mozilla/pdf.js) | PDF.js从PDF文件中读取内容，并在简历解析器的第一步中用于读取简历PDF的内容。 |
| **PDF渲染器** | [React-pdf](https://github.com/diegomura/react-pdf) | React-pdf创建PDF文件，并由简历构建器用于创建可下载的PDF文件。 |

## 📁 项目结构

OpenResume使用NextJS Web框架创建，并遵循其项目结构。源代码可以在`src/app`目录中找到。以下是总共4个页面路由的列表和代码路径（代码路径相对于`src/app`）：

| 页面路由 | 代码路径 | 描述 |
|--------|----------|------|
| / | /page.tsx | 包含主页、自动打字简历、步骤、推荐、标志云等的主页 |
| /resume-import | /resume-import/page.tsx | 简历导入页面，您可以选择从现有简历PDF导入数据。主要使用的组件是`ResumeDropzone` (`/components/ResumeDropzone.tsx`) |
| /resume-builder | /resume-builder/page.tsx | 简历构建页面，用于构建和下载简历PDF。主要使用的组件是`ResumeForm` (`/components/ResumeForm`) 和 `Resume` (`/components/Resume`) |
| /resume-parser | /resume-parser/page.tsx | 简历解析器页面，用于测试简历的AST可读性。主要使用的库工具是`parseResumeFromPdf` (`/lib/parse-resume-from-pdf`) |

## 💻 本地开发

### 方法1：使用npm

1. 下载仓库 `git clone https://github.com/xitanggg/open-resume.git`
2. 切换到目录 `cd open-resume`
3. 安装依赖 `npm install`
4. 启动开发服务器 `npm run dev`
5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看实时的OpenResume页面

### 方法2：使用Docker

1. 下载仓库 `git clone https://github.com/xitanggg/open-resume.git`
2. 切换到目录 `cd open-resume`
3. 构建容器 `docker build -t open-resume .`
4. 启动容器 `docker run -p 3000:3000 open-resume`
5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看实时的OpenResume页面
