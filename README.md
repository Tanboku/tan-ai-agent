# AI 超级智能体项目

本项目是一个基于 Spring AI 框架构建的 AI 应用实践项目，包含 **AI 恋爱大师** 和 **自主规划智能体（YuManus）** 两大核心模块，展示了从大模型接入、RAG 知识库、工具调用到 MCP 服务与自主 Agent 的完整 AI 开发链路。

------

## 项目简介

- **AI 恋爱大师**：面向情感咨询场景的智能对话应用，支持多轮记忆对话、基于自定义知识库的 RAG 检索、工具调用（地图、天气等）以及 MCP 服务集成，可帮助用户制定约会计划、解答情感问题。
- **自主规划智能体 YuManus**：基于 ReAct 模式的自主 Agent，能够理解用户目标，自主推理并调用工具（网页搜索、文件下载、PDF 生成等）完成复杂任务，最终输出结构化文档。

项目采用 Java 21 + Spring Boot 3 技术栈，深度集成 Spring AI 和 LangChain4j，并融合了向量数据库、Serverless 部署、异步推送等现代开发实践。

------

## 核心功能

### AI 恋爱大师

- 多轮对话与上下文记忆（持久化存储）
- 基于 RAG 的私有知识库问答（文档检索 + 向量匹配）
- 自定义工具调用（调用第三方 API 获取实时信息）
- MCP 服务集成（扩展外部能力，如图片搜索）
- 结构化输出（生成恋爱报告、建议方案）
- 多模态输入支持（文字 + 图像）

### 自主规划智能体 YuManus

- 自主推理与行动循环（ReAct 模式）
- 内置工具集：
  - 联网搜索（SearchAPI）
  - 网页抓取（Jsoup）
  - 文件读写与目录操作
  - 资源下载（HTTP 客户端）
  - 终端命令执行
  - PDF 文档生成（iText）
- 任务规划与拆解
- 执行结果汇总与输出

### MCP 服务

- 提供标准化模型上下文协议服务
- 示例：图片搜索 MCP（基于 Pexels API）
- 支持服务部署与安全配置

------

## 技术栈

| 类别        | 技术                                             |
| :---------- | :----------------------------------------------- |
| 语言与框架  | Java 21, Spring Boot 3, Spring AI, LangChain4j   |
| AI 模型接入 | 阿里云百炼平台, Ollama（本地部署）               |
| 向量数据库  | PGvector（PostgreSQL 扩展）                      |
| RAG 组件    | Spring AI 文档读取器、分割器、向量存储、检索增强 |
| 工具与协议  | Tool Calling, MCP (Model Context Protocol)       |
| 智能体模式  | ReAct Agent                                      |
| 异步通信    | SSE (Server-Sent Events)                         |
| 序列化      | Kryo                                             |
| 网页处理    | Jsoup                                            |
| PDF 生成    | iText                                            |
| API 文档    | Knife4j                                          |
| 部署        | Serverless 计算服务（如阿里云函数计算）          |

------

## 项目结构（示意）

text

```
yu-ai-agent/
├── ai-love-app/               # AI 恋爱大师模块
│   ├── chat/                  # 对话管理
│   ├── rag/                   # RAG 知识库
│   ├── tool/                  # 工具定义
│   ├── mcp/                   # MCP 客户端
│   └── config/                # Spring AI 配置
├── ai-agent/                  # 自主智能体模块
│   ├── core/                  # ReAct 引擎
│   ├── tools/                 # 内置工具实现
│   └── plan/                  # 任务规划
├── mcp-server/                # MCP 服务端示例
├── common/                    # 公共组件（文档模型、序列化等）
└── deploy/                    # 部署配置
```



------

## 快速开始

### 环境要求

- JDK 21+
- Maven 3.8+
- PostgreSQL 15+（启用 pgvector 扩展）
- （可选）Ollama 用于本地大模型

### 配置步骤

1. **克隆仓库**

   bash

   ```
   git clone https://github.com/liyupi/yu-ai-agent.git
   cd yu-ai-agent
   ```

   

2. **配置 AI 大模型**

   - 修改 `application.yml` 中的模型接入参数（API Key、Endpoint 等），支持阿里云百炼或 Ollama。
   - 示例配置：

   yaml

   ```
   spring:
     ai:
       openai:
         api-key: ${AI_API_KEY}
         base-url: ${AI_BASE_URL}
         chat:
           options:
             model: qwen-plus
   ```

   

3. **配置向量数据库**

   - 创建 PostgreSQL 数据库并启用 pgvector 扩展。
   - 设置数据源 URL、用户名和密码。

4. **构建与运行**

   bash

   ```
   mvn clean install
   java -jar target/yu-ai-agent.jar
   ```

   

5. **访问 API 文档**

   - 启动后访问 `http://localhost:8080/doc.html` 查看接口列表（Knife4j）。

------

## 核心特性详解

### RAG 知识库实战

- 支持多种文档格式（TXT、PDF、Markdown）的读取与分割
- 使用 Spring AI 的 `VectorStore` 接口与 PGvector 集成
- 实现查询增强、过滤、重排序等检索优化策略

### 工具调用机制

- 通过 `@Tool` 注解快速定义 Java 方法为可调用工具
- 支持同步与异步调用，返回结构化结果
- 工具示例：文件读写、网页抓取、PDF 生成、终端命令

### MCP 模型上下文协议

- 客户端模式：在对话中调用外部 MCP 服务
- 服务端模式：提供标准 MCP 服务接口
- 示例服务：图片搜索（Pexels）

### 自主智能体

- 基于 Spring AI `ReActAgent` 实现
- 动态规划任务步骤，按需调用工具
- 支持中断与恢复（可扩展）

------

## 部署与运维

- **本地部署**：直接运行 JAR 包
- **Serverless 部署**：支持阿里云函数计算等平台，提供弹性扩缩容
- **配置管理**：通过环境变量或配置中心动态调整模型参数、数据库连接等

------

## 扩展与定制

- **新增工具**：实现 `Tool` 接口或使用 `@Tool` 注解即可注册
- **自定义 RAG 流程**：替换文档读取器、分割器或检索器实现
- **接入新模型**：通过 Spring AI 的 `ChatClient` 配置新的 `ChatModel`
- **构建新 Agent**：继承 `ReActAgent` 并定制规划与执行策略

------

## 开源协议

本项目采用 MIT 许可证，可自由使用、修改和分发。

------

## 相关资源

- Spring AI 官方文档：https://docs.spring.io/spring-ai/reference/
- LangChain4j 文档：https://docs.langchain4j.dev/
- PGvector 项目：https://github.com/pgvector/pgvector
- 阿里云百炼平台：https://bailian.console.aliyun.com/

------

## 贡献指南

欢迎提交 Issue 和 Pull Request。请确保代码遵循项目风格，并包含必要的单元测试。

------

*本项目为技术教学与实践产物，旨在展示 AI 应用开发的完整流程与最佳实践。*