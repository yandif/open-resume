import {
  initialEducation,
  initialProfile,
  initialProject,
  initialWorkExperience,
} from "lib/redux/resumeSlice";
import type { Resume } from "lib/redux/types";
import { deepClone } from "lib/deep-clone";

export const END_HOME_RESUME: Resume = {
  profile: {
    name: "John Doe",
    summary: "软件工程师，热衷于构建人们喜爱的卓越产品",
    email: "hello@openresume.com",
    phone: "123-456-7890",
    location: "NYC, NY",
    url: "linkedin.com/in/john-doe",
  },
  workExperiences: [
    {
      company: "ABC 公司",
      jobTitle: "软件工程师",
      date: "2023年5月 ~ 至今",
      descriptions: [
        "带领一个由 5 名工程师组成的跨职能团队开发搜索栏，使成千上万的日活跃用户可以在整个平台上搜索内容",
        "制作了引人注目的主页产品演示动画，将注册率提高了 20%",
        "撰写干净、模块化且易于维护的代码，同时确保 100% 的测试覆盖率",
      ],
    },
    {
      company: "DEF 组织",
      jobTitle: "软件工程师实习生",
      date: "2022 年夏季",
      descriptions: [
        "重新设计了现有的内容编辑器以实现移动响应，在移动端用户参与度提高了 10%",
        "创建了一个进度条，帮助用户跟踪进度，将用户留存率提高了 15%",
        "在现有代码库中发现并修复了 5 个 bug，增强了用户体验",
      ],
    },
    {
      company: "XYZ大学",
      jobTitle: "研究助理",
      date: "2021年夏季",
      descriptions: [
        "设计了一种新的文本分类 NLP 算法，使准确率提高了 10%",
        "编译并向 20 多名教师和学生展示研究结果",
      ],
    },
  ],
  educations: [
    {
      school: "XYZ 大学",
      degree: "计算机科学学士学位",
      date: "2019年9月 ~ 2023年5月",
      gpa: "3.8",
      descriptions: [
        "荣获2022年教育黑客松一等奖，2023年健康科技竞赛二等奖",
        "2022年至2023年期间担任Web编程课程的助教",
        "课程内容：面向对象编程（A+）、Web 编程（A+）、云计算（A）、机器学习入门（A-）、算法分析（A-）",
      ],
    },
  ],
  projects: [
    {
      project: "OpenResume",
      date: "2023年春季",
      descriptions: [
        "创建并发布了一个免费的简历构建器 Web 应用程序，使数千名用户可以轻松创建专业的简历，并实现了他们的理想工作",
      ],
    },
  ],
  skills: {
    featuredSkills: [
      { skill: "HTML", rating: 4 },
      { skill: "CSS", rating: 4 },
      { skill: "Python", rating: 3 },
      { skill: "TypeScript", rating: 3 },
      { skill: "React", rating: 3 },
      { skill: "C++", rating: 2 },
    ],
    descriptions: [
      "技术：React Hooks、GraphQL、Node.js、SQL、Postgres、NoSql、Redis、REST API、Git",
      "软技能：团队合作、创造性问题解决、沟通、学习心态、敏捷开发",
    ],
  },
  custom: {
    descriptions: [],
  },
};

export const START_HOME_RESUME: Resume = {
  profile: deepClone(initialProfile),
  workExperiences: END_HOME_RESUME.workExperiences.map(() =>
    deepClone(initialWorkExperience)
  ),
  educations: [deepClone(initialEducation)],
  projects: [deepClone(initialProject)],
  skills: {
    featuredSkills: END_HOME_RESUME.skills.featuredSkills.map((item) => ({
      skill: "",
      rating: item.rating,
    })),
    descriptions: [],
  },
  custom: {
    descriptions: [],
  },
};
