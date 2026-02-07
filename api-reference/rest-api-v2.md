# Nexus-AI REST API v2 参考文档

**创建日期**: 2026-02-05  
**最后更新**: 2026-02-05  
**API 版本**: v2  
**基础路径**: `/api/v2`  
**文档状态**: 活跃

## 1. 概述

### 1.1 简介

Nexus-AI REST API v2 基于 **FastAPI** 框架构建，提供完整的 Agent 构建和管理平台接口。API 支持 RESTful 风格，使用 JSON 格式进行数据交换，并通过 Server-Sent Events (SSE) 支持流式响应。

### 1.2 服务信息

| 项目 | 说明 |
|------|------|
| **框架** | FastAPI |
| **ASGI 服务器** | Uvicorn |
| **默认端口** | 8000 |
| **API 文档** | `/docs` (Swagger UI), `/redoc` (ReDoc) |
| **OpenAPI 规范** | `/openapi.json` |
| **版本兼容** | 同时支持 `/api/v1` 和 `/api/v2` 前缀（v1 映射到 v2 处理器） |

### 1.3 通用响应格式

所有 API 端点返回统一的 JSON 响应格式：

```json
{
  "success": true,
  "data": { ... },
  "message": "操作成功",
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### 1.4 通用响应头

| 响应头 | 说明 |
|--------|------|
| `X-Request-ID` | 唯一请求标识符（UUID） |
| `X-Process-Time` | 请求处理耗时（秒） |

### 1.5 错误响应格式

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "服务器内部错误",
    "request_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

### 1.6 HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| `200` | 请求成功 |
| `400` | 请求参数错误 |
| `401` | 未认证 |
| `404` | 资源不存在 |
| `409` | 资源冲突（如重复创建） |
| `500` | 服务器内部错误 |
| `503` | 服务降级（健康检查） |

### 1.7 CORS 配置

API 支持跨域请求，配置如下：
- 允许所有来源（可通过配置限制）
- 允许所有 HTTP 方法
- 允许所有请求头
- 支持凭证传递
- 预检请求缓存 3600 秒

---

## 2. 认证 (`/auth`)

Nexus-AI 使用 JWT (JSON Web Token) 进行身份认证。登录成功后，Token 通过 HTTP-Only Cookie 和响应体同时返回。

### 2.1 用户登录

**`POST /api/v2/auth/login`**

验证用户名和密码，返回 JWT Token。

**请求体:**

```json
{
  "username": "admin",
  "password": "your_password"
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "username": "admin"
}
```

**错误响应 (401):**

```json
{
  "detail": "Invalid username or password"
}
```

> **说明**: 登录成功后，Token 会同时设置到 `access_token` Cookie 中（httponly, max_age=86400秒）。

---

### 2.2 用户登出

**`POST /api/v2/auth/logout`**

清除认证 Cookie。

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 2.3 获取当前用户信息

**`GET /api/v2/auth/me`**

获取当前已认证用户的信息。**需要认证。**

**成功响应 (200):**

```json
{
  "username": "admin",
  "authenticated": true
}
```

---

### 2.4 检查认证状态

**`GET /api/v2/auth/check`**

检查用户是否已登录。**需要认证。**

**成功响应 (200):**

```json
{
  "authenticated": true,
  "username": "admin"
}
```

---

## 3. Agent 管理 (`/agents`)

### 3.1 获取 Agent 列表

**`GET /api/v2/agents`**

获取所有 Agent 的列表，支持分页和筛选。

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `status` | string | 否 | - | 按状态筛选 |
| `category` | string | 否 | - | 按类别筛选 |
| `page` | int | 否 | 1 | 页码（≥1） |
| `limit` | int | 否 | 20 | 每页数量（1-100） |

**请求示例:**

```bash
curl -X GET "http://localhost:8000/api/v2/agents?status=running&page=1&limit=10"
```

**成功响应 (200):**

```json
{
  "success": true,
  "data": [
    {
      "agent_id": "agent_001",
      "agent_name": "pricing_agent",
      "display_name": "AWS 定价分析 Agent",
      "description": "AWS 产品定价分析",
      "status": "running",
      "category": "business_analysis",
      "created_at": "2026-02-01T10:00:00Z",
      "updated_at": "2026-02-05T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "total_pages": 3
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 3.2 获取 Agent 详情

**`GET /api/v2/agents/{agent_id}`**

获取指定 Agent 的详细信息。

**路径参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| `agent_id` | string | Agent ID |

**请求示例:**

```bash
curl -X GET "http://localhost:8000/api/v2/agents/agent_001"
```

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "agent_id": "agent_001",
    "agent_name": "pricing_agent",
    "display_name": "AWS 定价分析 Agent",
    "description": "AWS 产品定价分析",
    "status": "running",
    "category": "business_analysis",
    "code_path": "agents/generated_agents/pricing_agent/pricing_agent.py",
    "prompt_path": "generated_agents_prompts/pricing_agent/pricing_agent.yaml",
    "tools_path": "generated_tools/pricing_agent",
    "tools_dependencies": ["generated_tools/pricing_agent/pricing_tool"],
    "runtime_model_id": "us.anthropic.claude-sonnet-4-5-20250929-v1:0",
    "agentcore_runtime_arn": null,
    "created_at": "2026-02-01T10:00:00Z",
    "updated_at": "2026-02-05T08:00:00Z"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 3.3 获取 Agent 上下文

**`GET /api/v2/agents/{agent_id}/context`**

获取 Agent 的配置上下文信息，包括提示词路径、代码路径、工具路径、运行时配置等。

**请求示例:**

```bash
curl -X GET "http://localhost:8000/api/v2/agents/agent_001/context"
```

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "agent_id": "agent_001",
    "display_name": "AWS 定价分析 Agent",
    "system_prompt_path": "generated_agents_prompts/pricing_agent/pricing_agent.yaml",
    "code_path": "agents/generated_agents/pricing_agent/pricing_agent.py",
    "tools_path": "generated_tools/pricing_agent",
    "description": "AWS 产品定价分析",
    "tags": ["pricing", "aws"],
    "runtime_model_id": "us.anthropic.claude-sonnet-4-5-20250929-v1:0",
    "agentcore_runtime_arn": null,
    "agentcore_runtime_alias": null,
    "agentcore_region": null
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 3.4 获取 Agent 统计数据

**`GET /api/v2/agents/{agent_id}/statistics`**

获取 Agent 的调用统计信息。

**请求示例:**

```bash
curl -X GET "http://localhost:8000/api/v2/agents/agent_001/statistics"
```

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "agent_id": "agent_001",
    "total_invocations": 150,
    "total_input_tokens": 500000,
    "total_output_tokens": 250000,
    "total_tokens": 750000,
    "total_conversation_turns": 300,
    "avg_conversation_turns": 2.0,
    "total_duration_ms": 450000,
    "avg_duration_ms": 3000.0,
    "statistics_updated_at": "2026-02-05T10:00:00Z"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 3.5 检查 Agent 运行时健康状态

**`GET /api/v2/agents/{agent_id}/runtime/health`**

检查 Agent 的运行时配置和健康状态。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "agent_id": "agent_001",
    "agent_name": "pricing_agent",
    "status": "running",
    "has_agentcore_arn": false,
    "has_entrypoint": true,
    "runtime_type": "local_http",
    "agentcore_arn": null,
    "entrypoint": "agents/generated_agents/pricing_agent/pricing_agent.py",
    "is_ready": true
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 3.6 调用 Agent

**`POST /api/v2/agents/{agent_id}/invoke`**

发送输入文本，获取 Agent 响应。

**请求体:**

```json
{
  "input": "请分析 AWS EC2 t3.medium 实例的价格",
  "session_id": "session_001"
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "invocation_id": "inv_abc123def456",
    "session_id": "session_001",
    "output": "Agent 响应内容...",
    "duration_ms": 100,
    "status": "success"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 3.7 更新 Agent 状态

**`PUT /api/v2/agents/{agent_id}/status`**

更新 Agent 的运行状态。

**查询参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `status` | string | 是 | 新状态（`pending`, `building`, `running`, `stopped`, `error`, `deploying`, `deployed`） |
| `error_message` | string | 否 | 错误信息（状态为 error 时使用） |

**请求示例:**

```bash
curl -X PUT "http://localhost:8000/api/v2/agents/agent_001/status?status=running"
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Agent 状态更新成功",
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 3.8 删除 Agent

**`DELETE /api/v2/agents/{agent_id}`**

删除 Agent 及其相关资源。

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `delete_local_files` | bool | 否 | false | 是否删除本地文件 |
| `delete_cloud_resources` | bool | 否 | false | 是否删除云资源（AgentCore、ECR） |

**请求示例:**

```bash
curl -X DELETE "http://localhost:8000/api/v2/agents/agent_001?delete_local_files=true"
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Agent 删除成功. 已删除: database_record, sessions, local_files",
  "data": {
    "agent_id": "agent_001",
    "deleted_resources": ["database_record", "sessions", "local_files"],
    "errors": []
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

## 4. Agent 文件管理 (`/agents/{agent_id}/files`)

### 4.1 获取 Agent 所有文件

**`GET /api/v2/agents/{agent_id}/files`**

获取 Agent 的代码文件、提示词 YAML 文件和工具文件列表。

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `include_content` | bool | 否 | true | 是否包含文件内容 |

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "agent_id": "agent_001",
    "agent_name": "pricing_agent",
    "code_file": {
      "path": "agents/generated_agents/pricing_agent/pricing_agent.py",
      "name": "pricing_agent.py",
      "language": "python",
      "content": "# Agent 代码内容...",
      "size": 2048,
      "exists": true
    },
    "prompt_file": {
      "path": "prompts/generated_agents_prompts/pricing_agent/pricing_agent.yaml",
      "name": "pricing_agent.yaml",
      "language": "yaml",
      "content": "agent:\n  name: pricing_agent\n  ...",
      "size": 1024,
      "exists": true
    },
    "tool_files": [
      {
        "path": "tools/generated_tools/pricing_agent/pricing_tool.py",
        "name": "pricing_tool.py",
        "language": "python",
        "content": "# 工具代码...",
        "size": 512,
        "exists": true
      }
    ]
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 4.2 获取 Agent 代码文件

**`GET /api/v2/agents/{agent_id}/files/code`**

获取 Agent 的 Python 代码文件内容。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "path": "agents/generated_agents/pricing_agent/pricing_agent.py",
    "name": "pricing_agent.py",
    "language": "python",
    "content": "#!/usr/bin/env python3\n# Agent 代码...",
    "size": 2048,
    "exists": true
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 4.3 获取 Agent 提示词文件

**`GET /api/v2/agents/{agent_id}/files/prompt`**

获取 Agent 的提示词 YAML 文件内容。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "path": "prompts/generated_agents_prompts/pricing_agent/pricing_agent.yaml",
    "name": "pricing_agent.yaml",
    "language": "yaml",
    "content": "agent:\n  name: pricing_agent\n  ...",
    "size": 1024,
    "exists": true
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 4.4 获取 Agent 工具文件列表

**`GET /api/v2/agents/{agent_id}/files/tools`**

获取 Agent 关联的所有工具文件列表和内容。

**成功响应 (200):**

```json
{
  "success": true,
  "data": [
    {
      "path": "tools/generated_tools/pricing_agent/pricing_tool.py",
      "name": "pricing_tool.py",
      "language": "python",
      "content": "@tool\ndef get_pricing(...):\n    ...",
      "size": 512,
      "exists": true
    }
  ],
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 4.5 保存 Agent 代码文件

**`PUT /api/v2/agents/{agent_id}/files/code`**

保存 Agent 的 Python 代码文件。

**请求体:**

```json
{
  "content": "#!/usr/bin/env python3\n# 更新后的 Agent 代码...",
  "file_type": "code"
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "代码文件保存成功",
  "data": { "path": "agents/generated_agents/pricing_agent/pricing_agent.py" },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 4.6 保存 Agent 提示词文件

**`PUT /api/v2/agents/{agent_id}/files/prompt`**

保存 Agent 的提示词 YAML 文件。

**请求体:**

```json
{
  "content": "agent:\n  name: pricing_agent\n  description: 更新后的描述\n  ...",
  "file_type": "prompt"
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "提示词文件保存成功",
  "data": { "path": "prompts/generated_agents_prompts/pricing_agent/pricing_agent.yaml" },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 4.7 保存 Agent 工具文件

**`PUT /api/v2/agents/{agent_id}/files/tools/{tool_name}`**

保存指定的 Agent 工具文件。

**路径参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| `agent_id` | string | Agent ID |
| `tool_name` | string | 工具文件名 |

**请求体:**

```json
{
  "content": "@tool\ndef updated_tool(...):\n    ...",
  "file_type": "tool"
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "工具文件保存成功",
  "data": { "path": "tools/generated_tools/pricing_agent/pricing_tool.py" },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

## 5. 项目管理 (`/projects`)

### 5.1 创建项目

**`POST /api/v2/projects`**

创建新项目，接收需求描述并提交构建任务到队列。

**请求体:**

```json
{
  "requirement": "请创建一个 AWS 产品定价分析 Agent，支持 EC2、S3、RDS 等产品的价格查询和对比",
  "project_name": "aws_pricing_agent",
  "user_id": "user_001",
  "user_name": "张三",
  "priority": "normal",
  "tags": ["aws", "pricing"],
  "workflow_type": "agent_build"
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "项目创建成功",
  "data": {
    "project_id": "proj_abc123",
    "project_name": "aws_pricing_agent",
    "status": "pending",
    "task_id": "task_xyz789",
    "created_at": "2026-02-05T10:00:00Z"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 5.2 获取项目列表

**`GET /api/v2/projects`**

获取项目列表，支持分页、筛选和排序。

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `status` | string | 否 | - | 按状态筛选 |
| `user_id` | string | 否 | - | 按用户筛选 |
| `page` | int | 否 | 1 | 页码 |
| `limit` | int | 否 | 20 | 每页数量（1-100） |
| `sort_by` | string | 否 | `updated_at` | 排序字段（`updated_at`, `created_at`, `project_name`） |
| `sort_order` | string | 否 | `desc` | 排序方向（`asc`, `desc`） |

**请求示例:**

```bash
curl -X GET "http://localhost:8000/api/v2/projects?status=building&sort_by=created_at&sort_order=desc"
```

**成功响应 (200):**

```json
{
  "success": true,
  "data": [
    {
      "project_id": "proj_abc123",
      "project_name": "aws_pricing_agent",
      "status": "building",
      "current_stage": "agent_design",
      "created_at": "2026-02-05T10:00:00Z",
      "updated_at": "2026-02-05T10:30:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 5, "total_pages": 1 },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 5.3 获取项目详情

**`GET /api/v2/projects/{project_id}`**

获取指定项目的详细信息。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "project_id": "proj_abc123",
    "project_name": "aws_pricing_agent",
    "requirement": "请创建一个 AWS 产品定价分析 Agent...",
    "status": "building",
    "current_stage": "agent_design",
    "workflow_type": "agent_build",
    "stages": [ ... ],
    "created_at": "2026-02-05T10:00:00Z",
    "updated_at": "2026-02-05T10:30:00Z"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 5.4 获取构建仪表板

**`GET /api/v2/projects/{project_id}/build`**

获取项目的构建进度、阶段状态、指标等仪表板数据。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "project_id": "proj_abc123",
    "project_name": "aws_pricing_agent",
    "status": "building",
    "progress": 45,
    "current_stage": "agent_design",
    "stages": [
      {
        "name": "requirements_analysis",
        "display_name": "需求分析",
        "status": "completed",
        "started_at": "2026-02-05T10:00:00Z",
        "completed_at": "2026-02-05T10:05:00Z"
      }
    ],
    "metrics": {
      "total_tokens": 50000,
      "total_duration_ms": 30000
    }
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 5.5 获取项目阶段列表

**`GET /api/v2/projects/{project_id}/stages`**

获取项目的所有工作流阶段信息。

**成功响应 (200):**

```json
{
  "success": true,
  "data": [
    {
      "stage_name": "requirements_analysis",
      "status": "completed",
      "started_at": "2026-02-05T10:00:00Z",
      "completed_at": "2026-02-05T10:05:00Z",
      "metrics": { "input_tokens": 5000, "output_tokens": 3000 }
    },
    {
      "stage_name": "system_architecture",
      "status": "running",
      "started_at": "2026-02-05T10:05:00Z"
    }
  ],
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 5.6 控制项目

**`POST /api/v2/projects/{project_id}/control`**

控制项目的构建状态。

**请求体:**

```json
{
  "action": "pause",
  "reason": "需要审查当前阶段输出"
}
```

**支持的操作:**

| 操作 | 说明 |
|------|------|
| `pause` | 暂停构建 |
| `resume` | 恢复构建 |
| `stop` | 停止构建 |
| `cancel` | 取消构建 |

**成功响应 (200):**

```json
{
  "success": true,
  "message": "项目已暂停",
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 5.7 删除项目

**`DELETE /api/v2/projects/{project_id}`**

删除项目及其关联的阶段数据。

**成功响应 (200):**

```json
{
  "success": true,
  "message": "项目删除成功",
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 5.8 获取项目文件列表

**`GET /api/v2/projects/{project_id}/files`**

获取项目目录下的所有文件列表。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "files": [
      {
        "name": "requirements_analyzer.json",
        "path": "agents/pricing_agent/requirements_analyzer.json",
        "size": 4096,
        "type": "json",
        "modified_at": "2026-02-05T10:05:00Z"
      }
    ],
    "project_path": "/path/to/projects/proj_abc123"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 5.9 获取项目文件内容

**`GET /api/v2/projects/{project_id}/files/{file_path}`**

获取项目中指定文件的内容。支持 YAML、JSON、Markdown、Python 等格式。

**路径参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| `project_id` | string | 项目 ID |
| `file_path` | string | 文件相对路径（支持多级路径） |

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "filename": "requirements_analyzer.json",
    "path": "agents/pricing_agent/requirements_analyzer.json",
    "type": "json",
    "content": "{ ... }",
    "parsed_content": { ... }
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 5.10 获取工作流报告

**`GET /api/v2/projects/{project_id}/workflow-report`**

获取项目的工作流总结报告（Markdown 格式）。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "exists": true,
    "content": "# 工作流总结报告\n\n## 项目概述\n...",
    "path": "workflow_summary_report.md"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 5.11 获取阶段设计文档

**`GET /api/v2/projects/{project_id}/stage-docs/{stage_name}`**

获取特定阶段的设计文档。优先从文件系统读取，回退到数据库。

**路径参数:**

| 参数 | 类型 | 说明 |
|------|------|------|
| `project_id` | string | 项目 ID |
| `stage_name` | string | 阶段名称（如 `requirements_analysis`, `system_architecture` 等） |

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "exists": true,
    "stage_name": "requirements_analysis",
    "content": "{ ... }",
    "parsed_content": { ... },
    "path": "agents/pricing_agent/requirements_analyzer.json",
    "source": "file"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

## 6. 会话管理 (`/sessions`)

### 6.1 创建会话

**`POST /api/v2/agents/{agent_id}/sessions`**

为指定 Agent 创建新的对话会话。

**请求体:**

```json
{
  "user_id": "user_001",
  "display_name": "AWS 定价咨询",
  "metadata": { "source": "web" }
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "session_id": "sess_abc123",
    "agent_id": "agent_001",
    "user_id": "user_001",
    "display_name": "AWS 定价咨询",
    "status": "active",
    "created_at": "2026-02-05T10:00:00Z"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 6.2 获取 Agent 会话列表

**`GET /api/v2/agents/{agent_id}/sessions`**

获取指定 Agent 的所有会话列表。

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `limit` | int | 否 | 20 | 返回数量（1-100） |

**成功响应 (200):**

```json
{
  "success": true,
  "data": [
    {
      "session_id": "sess_abc123",
      "agent_id": "agent_001",
      "display_name": "AWS 定价咨询",
      "status": "active",
      "message_count": 10,
      "created_at": "2026-02-05T10:00:00Z",
      "updated_at": "2026-02-05T10:30:00Z"
    }
  ],
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 6.3 获取会话详情

**`GET /api/v2/sessions/{session_id}`**

获取指定会话的详细信息。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "session_id": "sess_abc123",
    "agent_id": "agent_001",
    "user_id": "user_001",
    "display_name": "AWS 定价咨询",
    "status": "active",
    "metadata": { "source": "web" },
    "created_at": "2026-02-05T10:00:00Z",
    "updated_at": "2026-02-05T10:30:00Z"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 6.4 获取会话消息列表

**`GET /api/v2/sessions/{session_id}/messages`**

获取会话中的所有消息。

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `limit` | int | 否 | 100 | 返回数量（1-500） |

**成功响应 (200):**

```json
{
  "success": true,
  "data": [
    {
      "message_id": "msg_001",
      "session_id": "sess_abc123",
      "role": "user",
      "content": "请查询 EC2 t3.medium 的价格",
      "metadata": {},
      "created_at": "2026-02-05T10:00:00Z"
    },
    {
      "message_id": "msg_002",
      "session_id": "sess_abc123",
      "role": "assistant",
      "content": "EC2 t3.medium 实例在 us-west-2 区域的按需价格为...",
      "metadata": {
        "tool_calls": [ ... ],
        "content_blocks": [ ... ]
      },
      "created_at": "2026-02-05T10:00:05Z"
    }
  ],
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 6.5 发送消息

**`POST /api/v2/sessions/{session_id}/messages`**

向会话发送消息。

**请求体:**

```json
{
  "role": "user",
  "content": "请查询 EC2 t3.medium 的价格",
  "metadata": {},
  "files": []
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "message_id": "msg_003",
    "session_id": "sess_abc123",
    "role": "user",
    "content": "请查询 EC2 t3.medium 的价格",
    "created_at": "2026-02-05T10:00:00Z"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 6.6 上传文件到会话

**`POST /api/v2/sessions/{session_id}/upload`**

上传文件到会话，返回文件信息供后续消息使用。支持图片、文档等多种格式。

**请求格式:** `multipart/form-data`

**表单字段:**

| 字段 | 类型 | 说明 |
|------|------|------|
| `files` | File[] | 上传的文件列表 |

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "files": [
      {
        "filename": "report.xlsx",
        "content_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "size": 10240,
        "data": "base64_encoded_content...",
        "file_id": "abc123def456"
      }
    ],
    "count": 1,
    "session_id": "sess_abc123"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 6.7 流式对话 (SSE)

**`POST /api/v2/sessions/{session_id}/stream`**

使用 Server-Sent Events (SSE) 进行流式对话。支持 AgentCore 运行时和本地 Agent，支持文件上传。

**请求体:**

```json
{
  "role": "user",
  "content": "请分析这份 Excel 报表中的数据",
  "files": [
    {
      "filename": "report.xlsx",
      "content_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "size": 10240,
      "data": "base64_encoded_content..."
    }
  ]
}
```

**响应格式:** `text/event-stream`

**SSE 事件类型:**

| 事件类型 | 说明 |
|----------|------|
| `connected` | 连接建立 |
| `message` (type: `text`) | 文本内容增量 |
| `message` (type: `tool_use`) | 工具调用开始 |
| `message` (type: `tool_input`) | 工具输入增量 |
| `message` (type: `tool_end`) | 工具调用结束 |
| `metrics` | 性能指标 |
| `error` | 错误信息 |
| `done` | 流式响应结束 |

**SSE 事件示例:**

```
data: {"event": "connected", "session_id": "sess_abc123"}

data: {"event": "message", "type": "text", "data": "根据"}

data: {"event": "message", "type": "text", "data": "分析结果"}

data: {"event": "message", "type": "tool_use", "tool_name": "get_pricing", "tool_id": "tool_001"}

data: {"event": "message", "type": "tool_input", "tool_id": "tool_001", "data": "{\"product\": \"EC2\"}"}

data: {"event": "message", "type": "tool_end", "tool_id": "tool_001", "tool_name": "get_pricing", "tool_input": "{\"product\": \"EC2\"}", "tool_result": "价格数据..."}

data: {"event": "message", "type": "text", "data": "EC2 的价格为..."}

data: {"event": "done"}
```

> **说明**: 流式响应结束后，助手消息（包含工具调用信息和内容块顺序）会异步保存到数据库。首条用户消息会自动更新会话名称。

---

### 6.8 删除会话

**`DELETE /api/v2/sessions/{session_id}`**

删除指定会话及其所有消息。

**成功响应 (200):**

```json
{
  "success": true,
  "message": "会话删除成功",
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

## 7. 任务管理 (`/tasks`)

### 7.1 获取任务状态

**`GET /api/v2/tasks/{task_id}`**

查询构建任务、部署任务等的执行状态。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "task_id": "task_xyz789",
    "task_type": "build",
    "status": "running",
    "project_id": "proj_abc123",
    "progress": 60,
    "message": "正在执行 Agent 设计阶段",
    "created_at": "2026-02-05T10:00:00Z",
    "updated_at": "2026-02-05T10:15:00Z"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

## 8. 统计数据 (`/statistics`)

### 8.1 获取统计概览

**`GET /api/v2/statistics/overview`**

获取项目、Agent、调用等的汇总统计数据。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "total_projects": 15,
    "total_agents": 8,
    "total_sessions": 120,
    "total_invocations": 500,
    "active_projects": 3,
    "running_agents": 5
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 8.2 获取构建统计

**`GET /api/v2/statistics/builds`**

获取按天统计的构建数据。

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `days` | int | 否 | 7 | 统计天数（1-90） |

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "daily_stats": [
      { "date": "2026-02-05", "total": 5, "success": 4, "failed": 1 },
      { "date": "2026-02-04", "total": 3, "success": 3, "failed": 0 }
    ],
    "total_builds": 8,
    "success_rate": 87.5
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 8.3 获取调用统计

**`GET /api/v2/statistics/invocations`**

获取按天统计的 Agent 调用数据。

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `days` | int | 否 | 7 | 统计天数（1-90） |

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "daily_stats": [
      { "date": "2026-02-05", "invocations": 50, "tokens": 100000 }
    ],
    "total_invocations": 50,
    "total_tokens": 100000
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 8.4 获取 Agent 分类分布

**`GET /api/v2/statistics/agent-categories`**

获取各分类的 Agent 数量统计。

**成功响应 (200):**

```json
{
  "success": true,
  "data": [
    { "category": "business_analysis", "count": 3 },
    { "category": "customer_service", "count": 2 },
    { "category": "data_analysis", "count": 3 }
  ],
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 8.5 获取热门 Agent

**`GET /api/v2/statistics/top-agents`**

获取调用次数最多的 Agent 列表。

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `limit` | int | 否 | 10 | 返回数量（1-50） |

**成功响应 (200):**

```json
{
  "success": true,
  "data": [
    { "agent_id": "agent_001", "agent_name": "pricing_agent", "invocations": 150 },
    { "agent_id": "agent_002", "agent_name": "support_agent", "invocations": 80 }
  ],
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 8.6 获取最近活动

**`GET /api/v2/statistics/recent-activities`**

获取最近的项目和 Agent 活动记录。

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `limit` | int | 否 | 10 | 返回数量（1-50） |

**成功响应 (200):**

```json
{
  "success": true,
  "data": [
    {
      "type": "project_created",
      "project_id": "proj_abc123",
      "project_name": "aws_pricing_agent",
      "timestamp": "2026-02-05T10:00:00Z"
    }
  ],
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 8.7 获取系统健康状态

**`GET /api/v2/statistics/system-health`**

获取系统各组件的健康状态。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "api": "healthy",
    "dynamodb": "healthy",
    "sqs": "healthy",
    "bedrock": "healthy"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

## 9. 工具管理 (`/tools`)

### 9.1 获取工具分类

**`GET /api/v2/tools/categories`**

获取所有工具分类列表。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "categories": [
      "Agents & Workflows",
      "AWS Services",
      "Code Interpretation",
      "File Operations",
      "Generated Tools",
      "MCP Tools",
      "Multi-modal",
      "RAG & Memory",
      "Shell & System",
      "System Tools",
      "Template Tools",
      "Utilities",
      "Web & Network"
    ],
    "total": 13
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 9.2 获取工具列表

**`GET /api/v2/tools/list`**

获取所有工具列表，支持按类型、分类筛选和关键词搜索。

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `type` | string | 否 | - | 工具类型（`builtin`, `generated`, `system`, `template`, `mcp`） |
| `category` | string | 否 | - | 工具分类 |
| `search` | string | 否 | - | 搜索关键词 |

**请求示例:**

```bash
curl -X GET "http://localhost:8000/api/v2/tools/list?type=builtin&category=File%20Operations"
```

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "tools": [
      {
        "name": "file_read",
        "type": "builtin",
        "category": "File Operations",
        "description": "读取和解析文件",
        "package": "strands-agents-tools",
        "enabled": true,
        "parameters": [],
        "mcp_server": null,
        "return_type": null
      },
      {
        "name": "file_write",
        "type": "builtin",
        "category": "File Operations",
        "description": "创建和修改文件",
        "package": "strands-agents-tools",
        "enabled": true,
        "parameters": [],
        "mcp_server": null,
        "return_type": null
      }
    ],
    "total": 2,
    "by_type": {
      "builtin": 2,
      "generated": 0,
      "system": 0,
      "template": 0,
      "mcp": 0
    }
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 9.3 获取工具详情

**`GET /api/v2/tools/{tool_name}`**

获取指定工具的详细信息，包括参数定义和源代码（自定义工具）。

**查询参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | string | 否 | 工具类型（用于缩小搜索范围） |

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "name": "get_pricing",
    "type": "generated",
    "category": "pricing_agent",
    "description": "获取 AWS 产品定价信息",
    "file_path": "/path/to/tools/generated_tools/pricing_agent/pricing_tool.py",
    "parameters": [
      { "name": "product_type", "type": "str", "required": true, "default": null },
      { "name": "region", "type": "str", "required": false, "default": null }
    ],
    "return_type": "Dict[str, Any]",
    "source_code": "@tool\ndef get_pricing(product_type: str, region: str = 'us-west-2'):\n    ..."
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 9.4 测试工具

**`POST /api/v2/tools/{tool_name}/test`**

测试自定义工具的执行。仅支持自定义工具，内置工具需在 Agent 上下文中测试。

**请求体:**

```json
{
  "parameters": {
    "product_type": "EC2",
    "region": "us-west-2"
  }
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "success": true,
    "output": "{ \"price\": 0.0416, \"unit\": \"per hour\" }",
    "error": null,
    "duration_ms": 250
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

## 10. MCP 服务器管理

Nexus-AI 提供两套 MCP 管理接口：一套位于 `/tools/mcp/` 路径下（基于文件配置），另一套位于 `/mcp/` 路径下（基于 MCP Manager 核心模块）。两套接口功能类似，推荐使用 `/mcp/` 路径的接口。

### 10.1 MCP Manager 接口 (`/mcp`)

#### 10.1.1 获取 MCP 服务器列表

**`GET /api/v2/mcp/servers`**

列出所有 MCP 服务器配置。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "servers": [
      {
        "name": "aws-api-mcp",
        "transport": "stdio",
        "disabled": false,
        "description": "AWS API MCP Server",
        "command": "uvx",
        "args": ["awslabs.aws-api-mcp-server@latest"],
        "url": null,
        "auto_approve": ["*"]
      }
    ],
    "total": 1,
    "enabled": 1,
    "disabled": 0
  }
}
```

---

#### 10.1.2 获取 MCP 服务器详情

**`GET /api/v2/mcp/servers/{name}`**

获取指定 MCP 服务器的配置详情。

**成功响应 (200):**

```json
{
  "name": "aws-api-mcp",
  "transport": "stdio",
  "disabled": false,
  "description": "AWS API MCP Server",
  "command": "uvx",
  "args": ["awslabs.aws-api-mcp-server@latest"],
  "url": null,
  "auto_approve": ["*"]
}
```

---

#### 10.1.3 导入 MCP 服务器配置

**`POST /api/v2/mcp/servers/import`**

导入 MCP 服务器配置，支持多种格式（标准 JSON、NPX/UVX 命令、SSE/HTTP URL）。

**请求体:**

```json
{
  "config_data": "{ \"mcpServers\": { \"my-server\": { \"command\": \"uvx\", \"args\": [\"my-mcp-server\"] } } }",
  "format": "auto"
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Successfully imported 1 server(s)"
}
```

---

#### 10.1.4 创建 MCP 服务器

**`POST /api/v2/mcp/servers`**

创建新的 MCP 服务器配置。

**请求体:**

```json
{
  "name": "my-mcp-server",
  "transport": "stdio",
  "command": "uvx",
  "args": ["my-mcp-server@latest"],
  "env": { "API_KEY": "xxx" },
  "auto_approve": ["*"],
  "disabled": false,
  "description": "自定义 MCP 服务器"
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Successfully created server 'my-mcp-server'"
}
```

---

#### 10.1.5 更新 MCP 服务器

**`PUT /api/v2/mcp/servers/{name}`**

更新指定 MCP 服务器的配置。

**请求体:** 同创建请求。

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Successfully updated server 'my-mcp-server'"
}
```

---

#### 10.1.6 删除 MCP 服务器

**`DELETE /api/v2/mcp/servers/{name}`**

删除指定的 MCP 服务器配置。

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Successfully deleted server 'my-mcp-server'"
}
```

---

#### 10.1.7 测试 MCP 连接

**`POST /api/v2/mcp/servers/{name}/test`**

测试 MCP 服务器连接，尝试启动服务器并获取工具列表。

**成功响应 (200):**

```json
{
  "success": true,
  "server_name": "aws-api-mcp",
  "tool_count": 5,
  "tools": [
    { "name": "list_ec2_instances", "description": "列出 EC2 实例", "input_schema": { ... } }
  ],
  "error": null
}
```

---

#### 10.1.8 获取 MCP 服务器工具列表

**`GET /api/v2/mcp/servers/{name}/tools`**

列出 MCP 服务器提供的所有工具。需要实际连接到 MCP 服务器。

**成功响应 (200):**

```json
{
  "success": true,
  "data": [
    { "name": "list_ec2_instances", "description": "列出 EC2 实例", "input_schema": { ... } }
  ],
  "message": "Found 5 tools"
}
```

---

#### 10.1.9 启用 MCP 服务器

**`POST /api/v2/mcp/servers/{name}/enable`**

启用指定的 MCP 服务器。

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Successfully enabled server 'aws-api-mcp'"
}
```

---

#### 10.1.10 禁用 MCP 服务器

**`POST /api/v2/mcp/servers/{name}/disable`**

禁用指定的 MCP 服务器。

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Successfully disabled server 'aws-api-mcp'"
}
```

---

### 10.2 工具路由下的 MCP 接口 (`/tools/mcp`)

以下接口位于 `/tools/mcp/` 路径下，基于文件配置直接操作。

#### 10.2.1 获取 MCP 服务器列表

**`GET /api/v2/tools/mcp/servers`**

#### 10.2.2 获取 MCP 服务器详情

**`GET /api/v2/tools/mcp/servers/{server_name}`**

#### 10.2.3 创建 MCP 服务器

**`POST /api/v2/tools/mcp/servers`**

**请求体:**

```json
{
  "name": "my-server",
  "transport": "stdio",
  "command": "uvx",
  "args": ["my-mcp-server@latest"],
  "env": {},
  "description": "描述",
  "auto_approve": []
}
```

#### 10.2.4 更新 MCP 服务器配置

**`PUT /api/v2/tools/mcp/servers/{server_name}`**

**请求体:**

```json
{
  "disabled": false,
  "auto_approve": ["*"]
}
```

#### 10.2.5 删除 MCP 服务器

**`DELETE /api/v2/tools/mcp/servers/{server_name}`**

#### 10.2.6 启用 MCP 服务器

**`POST /api/v2/tools/mcp/servers/{server_name}/enable`**

#### 10.2.7 禁用 MCP 服务器

**`POST /api/v2/tools/mcp/servers/{server_name}/disable`**

#### 10.2.8 测试 MCP 连接

**`POST /api/v2/tools/mcp/servers/{server_name}/test`**

#### 10.2.9 获取 MCP 服务器工具

**`GET /api/v2/tools/mcp/servers/{server_name}/tools`**

---

## 11. 工作流管理 (`/workflows`)

### 11.1 创建 Agent 更新工作流

**`POST /api/v2/workflows/agent-update`**

创建 Agent 更新工作流，对已有 Agent 进行更新（工具函数、提示词模板、Agent 代码）。

**请求体:**

```json
{
  "agent_id": "agent_001",
  "update_requirement": "添加对 Lambda 产品的定价支持",
  "user_id": "user_001",
  "user_name": "张三",
  "priority": "normal"
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Agent 更新任务已创建",
  "data": {
    "project_id": "proj_update_001",
    "task_id": "task_update_001",
    "status": "pending"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 11.2 更新指定 Agent（便捷端点）

**`POST /api/v2/workflows/agents/{agent_id}/update`**

在 Agent 详情页点击更新按钮时调用的便捷端点。

**请求体:** 同 11.1。

---

### 11.3 创建工具构建工作流

**`POST /api/v2/workflows/tool-build`**

根据需求描述自动构建工具函数。

**请求体:**

```json
{
  "requirement": "创建一个可以查询 AWS CloudWatch 指标的工具",
  "tool_name": "cloudwatch_metrics",
  "category": "monitoring",
  "target_agent": "agent_001",
  "user_id": "user_001",
  "user_name": "张三",
  "priority": "normal",
  "tags": ["aws", "monitoring"]
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "工具构建任务已创建",
  "data": {
    "project_id": "proj_tool_001",
    "task_id": "task_tool_001",
    "status": "pending"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 11.4 获取工作流状态

**`GET /api/v2/workflows/{project_id}/status`**

获取工作流的当前状态、进度、已完成阶段等信息。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "project_id": "proj_abc123",
    "status": "building",
    "current_stage": "agent_design",
    "completed_stages": ["requirements_analysis", "system_architecture"],
    "pending_stages": ["prompt_engineer", "tools_developer"]
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 11.5 获取工作流类型列表

**`GET /api/v2/workflows/types`**

获取系统支持的所有工作流类型。

**成功响应 (200):**

```json
{
  "success": true,
  "data": [
    {
      "type": "agent_build",
      "name": "agent_build",
      "display_name": "Agent 构建",
      "description": "从需求描述自动构建 Agent",
      "stages_count": 9,
      "enabled": true
    },
    {
      "type": "agent_update",
      "name": "agent_update",
      "display_name": "Agent 更新",
      "description": "更新已有 Agent",
      "stages_count": 5,
      "enabled": true
    },
    {
      "type": "tool_build",
      "name": "tool_build",
      "display_name": "工具构建",
      "description": "自动构建工具函数",
      "stages_count": 4,
      "enabled": true
    }
  ],
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

## 12. 工作流控制 (`/workflow`)

### 12.1 暂停工作流

**`POST /api/v2/workflow/{project_id}/pause`**

暂停正在执行的工作流。

**请求体:**

```json
{
  "reason": "需要审查当前阶段输出"
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Workflow paused successfully",
  "project_id": "proj_abc123",
  "control_status": "paused",
  "timestamp": "2026-02-05T10:00:00Z"
}
```

---

### 12.2 恢复工作流

**`POST /api/v2/workflow/{project_id}/resume`**

恢复暂停的工作流。通过 SQS 队列创建新任务由 Worker 继续执行。

**请求体:**

```json
{
  "from_stage": "agent_design"
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Workflow resumed successfully",
  "project_id": "proj_abc123",
  "control_status": "running",
  "timestamp": "2026-02-05T10:00:00Z"
}
```

---

### 12.3 停止工作流

**`POST /api/v2/workflow/{project_id}/stop`**

停止工作流执行。

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Workflow stopped successfully",
  "project_id": "proj_abc123",
  "control_status": "stopped",
  "timestamp": "2026-02-05T10:00:00Z"
}
```

---

### 12.4 重启工作流

**`POST /api/v2/workflow/{project_id}/restart`**

从指定阶段重启工作流。

**请求体:**

```json
{
  "from_stage": "agent_design",
  "clear_subsequent": true
}
```

**有效阶段名称:**

| 阶段名称 | 说明 |
|----------|------|
| `orchestrator` | 编排器 |
| `requirements_analysis` | 需求分析 |
| `system_architecture` | 系统架构 |
| `agent_design` | Agent 设计 |
| `prompt_engineer` | 提示词工程 |
| `tools_developer` | 工具开发 |
| `agent_code_developer` | Agent 代码开发 |
| `agent_developer_manager` | 开发管理 |
| `agent_deployer` | Agent 部署 |

**成功响应 (200):**

```json
{
  "success": true,
  "message": "Workflow restarted from stage: agent_design",
  "project_id": "proj_abc123",
  "control_status": "running",
  "timestamp": "2026-02-05T10:00:00Z"
}
```

---

### 12.5 获取工作流状态

**`GET /api/v2/workflow/{project_id}/status`**

获取工作流的完整状态信息。

**成功响应 (200):**

```json
{
  "project_id": "proj_abc123",
  "project_name": "aws_pricing_agent",
  "status": "building",
  "control_status": "running",
  "current_stage": "agent_design",
  "completed_stages": ["orchestrator", "requirements_analysis", "system_architecture"],
  "pending_stages": ["prompt_engineer", "tools_developer"],
  "aggregated_metrics": { "total_tokens": 50000, "total_duration_ms": 30000 }
}
```

---

### 12.6 获取阶段状态

**`GET /api/v2/workflow/{project_id}/stages/{stage_name}`**

获取指定阶段的详细状态。

**成功响应 (200):**

```json
{
  "project_id": "proj_abc123",
  "stage_name": "requirements_analysis",
  "status": "completed",
  "started_at": "2026-02-05T10:00:00Z",
  "completed_at": "2026-02-05T10:05:00Z",
  "error_message": null,
  "metrics": { "input_tokens": 5000, "output_tokens": 3000, "duration_ms": 5000 }
}
```

---

### 12.7 获取工作流指标

**`GET /api/v2/workflow/{project_id}/metrics`**

获取工作流的所有阶段指标和聚合指标。

**成功响应 (200):**

```json
{
  "project_id": "proj_abc123",
  "stage_metrics": {
    "requirements_analysis": { "input_tokens": 5000, "output_tokens": 3000 },
    "system_architecture": { "input_tokens": 8000, "output_tokens": 5000 }
  },
  "aggregated_metrics": { "total_tokens": 21000, "total_duration_ms": 15000 }
}
```

---

### 12.8 获取阶段输出

**`GET /api/v2/workflow/{project_id}/stages/{stage_name}/output`**

获取阶段的输出内容，包括设计文档和生成的文件。

**成功响应 (200):**

```json
{
  "project_id": "proj_abc123",
  "stage_name": "requirements_analysis",
  "content": "需求分析输出内容...",
  "document_content": "{ ... }",
  "document_format": "json",
  "generated_files": [
    { "path": "agents/pricing_agent/requirements.json", "type": "json" }
  ]
}
```

---

### 12.9 获取多 Agent 进度

**`GET /api/v2/workflow/{project_id}/multi-agent/progress`**

获取多 Agent 项目的整体进度。

**成功响应 (200):**

```json
{
  "project_id": "proj_abc123",
  "is_multi_agent": true,
  "agent_count": 3,
  "orchestration_pattern": "graph",
  "main_agent": "orchestrator",
  "agents": [
    {
      "name": "pricing_agent",
      "type": "worker",
      "description": "定价分析",
      "orchestration_pattern": "standalone",
      "dependencies": [],
      "tools": ["get_pricing"]
    }
  ],
  "progress": { ... }
}
```

---

### 12.10 获取单个 Agent 进度

**`GET /api/v2/workflow/{project_id}/multi-agent/agents/{agent_name}/progress`**

获取多 Agent 项目中指定 Agent 的进度。

**成功响应 (200):**

```json
{
  "project_id": "proj_abc123",
  "agent_name": "pricing_agent",
  "agent_type": "worker",
  "description": "定价分析",
  "current_stage": "agent_code_developer",
  "completed_stages": 5,
  "total_stages": 7,
  "progress_percentage": 71.4,
  "stage_statuses": {
    "requirements_analysis": "completed",
    "system_architecture": "completed",
    "agent_design": "completed",
    "prompt_engineer": "completed",
    "tools_developer": "completed",
    "agent_code_developer": "running",
    "agent_developer_manager": "pending"
  }
}
```

---

### 12.11 获取项目文件列表

**`GET /api/v2/workflow/{project_id}/files`**

列出项目的所有生成文件。

**查询参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `stage_name` | string | 否 | 按阶段筛选 |

**成功响应 (200):**

```json
{
  "project_id": "proj_abc123",
  "files": [
    { "path": "agents/pricing_agent/pricing_agent.py", "size": 2048, "stage": "agent_code_developer" }
  ],
  "total_count": 5
}
```

---

### 12.12 获取文件内容

**`GET /api/v2/workflow/{project_id}/files/{file_path}`**

获取项目中指定文件的内容。

**成功响应 (200):**

```json
{
  "project_id": "proj_abc123",
  "file_path": "agents/pricing_agent/pricing_agent.py",
  "content": "#!/usr/bin/env python3\n...",
  "size": 2048,
  "checksum": "abc123",
  "last_modified": "2026-02-05T10:30:00Z"
}
```

---

## 13. 配置管理 (`/config`)

### 13.1 获取配置文件列表

**`GET /api/v2/config`**

获取配置目录下的所有配置文件。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "files": [
      {
        "name": "default_config.yaml",
        "path": "config/default_config.yaml",
        "size": 2048,
        "modified_at": "2026-02-01T10:00:00Z",
        "type": "yaml"
      },
      {
        "name": "logging_config.yaml",
        "path": "config/logging_config.yaml",
        "size": 512,
        "modified_at": "2026-02-01T10:00:00Z",
        "type": "yaml"
      }
    ],
    "config_dir": "/path/to/config"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 13.2 获取配置文件内容

**`GET /api/v2/config/{filename}`**

获取指定配置文件的内容，同时返回解析后的对象和原始文本。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "filename": "default_config.yaml",
    "content": { "default-config": { "aws": { "bedrock_region_name": "us-west-2" } } },
    "raw_content": "default-config:\n  aws:\n    bedrock_region_name: 'us-west-2'\n...",
    "type": "yaml"
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 13.3 更新配置文件

**`PUT /api/v2/config/{filename}`**

更新配置文件，支持两种方式：传入解析后的对象或原始文本。更新前会自动备份原文件。

**请求体（方式一 - 原始文本）:**

```json
{
  "raw_content": "default-config:\n  aws:\n    bedrock_region_name: 'us-east-1'\n..."
}
```

**请求体（方式二 - 解析后对象）:**

```json
{
  "content": {
    "default-config": {
      "aws": { "bedrock_region_name": "us-east-1" }
    }
  }
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "message": "配置文件 default_config.yaml 更新成功",
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 13.4 验证配置格式

**`POST /api/v2/config/{filename}/validate`**

验证配置内容的格式是否正确（YAML 或 JSON）。

**请求体:**

```json
{
  "raw_content": "default-config:\n  aws:\n    bedrock_region_name: 'us-west-2'"
}
```

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "valid": true,
    "parsed": { "default-config": { "aws": { "bedrock_region_name": "us-west-2" } } }
  },
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

### 13.5 恢复配置备份

**`POST /api/v2/config/{filename}/restore`**

从备份文件恢复配置。

**成功响应 (200):**

```json
{
  "success": true,
  "message": "配置文件 default_config.yaml 已从备份恢复",
  "timestamp": "2026-02-05T10:00:00Z",
  "request_id": "uuid-string"
}
```

---

## 14. Agent 图谱 (`/agent-graph`)

### 14.1 获取 Agent 关系图

**`GET /api/v2/agent-graph`**

获取所有 Agent、工具及其关系的图数据，支持多种筛选条件。

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `include_tools` | bool | 否 | true | 是否包含工具节点 |
| `include_versions` | bool | 否 | true | 是否包含版本节点 |
| `category` | string | 否 | - | 按分类筛选 |
| `tag` | string | 否 | - | 按标签筛选 |
| `tool_type` | string | 否 | - | 按工具类型筛选 |

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "nodes": [
      {
        "id": "agent_001",
        "type": "agent",
        "name": "pricing_agent",
        "category": "business_analysis",
        "tags": ["aws", "pricing"]
      },
      {
        "id": "tool_get_pricing",
        "type": "tool",
        "name": "get_pricing",
        "tool_type": "generated"
      }
    ],
    "edges": [
      {
        "source": "agent_001",
        "target": "tool_get_pricing",
        "type": "uses_tool"
      }
    ]
  }
}
```

---

### 14.2 获取节点详情

**`GET /api/v2/agent-graph/node/{node_id}`**

获取指定节点（Agent 或工具）的详细信息。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "id": "agent_001",
    "name": "pricing_agent",
    "type": "agent",
    "description": "AWS 产品定价分析",
    "category": "business_analysis",
    "tools": ["get_pricing", "calculate_cost"]
  }
}
```

---

### 14.3 获取图统计信息

**`GET /api/v2/agent-graph/stats`**

获取 Agent 图谱的统计信息。

**成功响应 (200):**

```json
{
  "success": true,
  "data": {
    "stats": {
      "agent_count": 8,
      "version_count": 15,
      "tool_count": 30,
      "edge_count": 45
    },
    "filters": {
      "categories": ["business_analysis", "customer_service"],
      "tags": ["aws", "pricing", "support"],
      "tool_types": ["builtin", "generated", "system"]
    }
  }
}
```

---

## 15. AgentCore 代理 (`/agentcore`)

### 15.1 AgentCore 流式调用

**`POST /api/v2/agentcore/stream`**

直接调用 AWS AgentCore Runtime 进行流式对话，无需通过会话管理层。

**请求体:**

```json
{
  "runtime_arn": "arn:aws:bedrock:us-west-2:123456789:agent-runtime/xxx",
  "session_id": "sess_abc123",
  "content": "请分析 EC2 实例的价格",
  "runtime_alias": "DEFAULT",
  "region": "us-west-2"
}
```

**响应格式:** `text/event-stream` (SSE)

**SSE 事件示例:**

```
data: {"event": "connected", "session_id": "sess_abc123"}

data: {"event": "message", "type": "text", "data": "分析结果..."}

data: {"event": "done"}
```

---

## 16. 系统端点

### 16.1 健康检查

**`GET /health`**

检查系统各组件的健康状态，包括 DynamoDB 和 SQS。

**成功响应 (200):**

```json
{
  "status": "healthy",
  "service": "nexus-ai-api",
  "version": "2.0.0",
  "checks": {
    "dynamodb": "healthy",
    "sqs": "healthy"
  }
}
```

**降级响应 (503):**

```json
{
  "status": "degraded",
  "service": "nexus-ai-api",
  "version": "2.0.0",
  "checks": {
    "dynamodb": "healthy",
    "sqs": "error: Connection refused"
  }
}
```

---

### 16.2 根端点

**`GET /`**

返回 API 基本信息。

**成功响应 (200):**

```json
{
  "message": "Nexus AI Platform API",
  "version": "2.0.0",
  "docs": "/docs",
  "health": "/health",
  "api_prefix": "/api/v2"
}
```

---

## 17. API 端点总览

### 17.1 按资源分组的端点清单

| 分组 | 方法 | 路径 | 说明 |
|------|------|------|------|
| **系统** | GET | `/` | 根端点 |
| | GET | `/health` | 健康检查 |
| **认证** | POST | `/api/v2/auth/login` | 用户登录 |
| | POST | `/api/v2/auth/logout` | 用户登出 |
| | GET | `/api/v2/auth/me` | 获取当前用户 |
| | GET | `/api/v2/auth/check` | 检查认证状态 |
| **Agent** | GET | `/api/v2/agents` | Agent 列表 |
| | GET | `/api/v2/agents/{id}` | Agent 详情 |
| | GET | `/api/v2/agents/{id}/context` | Agent 上下文 |
| | GET | `/api/v2/agents/{id}/statistics` | Agent 统计 |
| | GET | `/api/v2/agents/{id}/runtime/health` | 运行时健康 |
| | POST | `/api/v2/agents/{id}/invoke` | 调用 Agent |
| | PUT | `/api/v2/agents/{id}/status` | 更新状态 |
| | DELETE | `/api/v2/agents/{id}` | 删除 Agent |
| **Agent 文件** | GET | `/api/v2/agents/{id}/files` | 所有文件 |
| | GET | `/api/v2/agents/{id}/files/code` | 代码文件 |
| | GET | `/api/v2/agents/{id}/files/prompt` | 提示词文件 |
| | GET | `/api/v2/agents/{id}/files/tools` | 工具文件 |
| | PUT | `/api/v2/agents/{id}/files/code` | 保存代码 |
| | PUT | `/api/v2/agents/{id}/files/prompt` | 保存提示词 |
| | PUT | `/api/v2/agents/{id}/files/tools/{name}` | 保存工具 |
| **项目** | POST | `/api/v2/projects` | 创建项目 |
| | GET | `/api/v2/projects` | 项目列表 |
| | GET | `/api/v2/projects/{id}` | 项目详情 |
| | GET | `/api/v2/projects/{id}/build` | 构建仪表板 |
| | GET | `/api/v2/projects/{id}/stages` | 阶段列表 |
| | POST | `/api/v2/projects/{id}/control` | 控制项目 |
| | DELETE | `/api/v2/projects/{id}` | 删除项目 |
| | GET | `/api/v2/projects/{id}/files` | 文件列表 |
| | GET | `/api/v2/projects/{id}/files/{path}` | 文件内容 |
| | GET | `/api/v2/projects/{id}/workflow-report` | 工作流报告 |
| | GET | `/api/v2/projects/{id}/stage-docs/{stage}` | 阶段文档 |
| **会话** | POST | `/api/v2/agents/{id}/sessions` | 创建会话 |
| | GET | `/api/v2/agents/{id}/sessions` | 会话列表 |
| | GET | `/api/v2/sessions/{id}` | 会话详情 |
| | GET | `/api/v2/sessions/{id}/messages` | 消息列表 |
| | POST | `/api/v2/sessions/{id}/messages` | 发送消息 |
| | POST | `/api/v2/sessions/{id}/upload` | 上传文件 |
| | POST | `/api/v2/sessions/{id}/stream` | 流式对话 |
| | DELETE | `/api/v2/sessions/{id}` | 删除会话 |
| **任务** | GET | `/api/v2/tasks/{id}` | 任务状态 |
| **统计** | GET | `/api/v2/statistics/overview` | 统计概览 |
| | GET | `/api/v2/statistics/builds` | 构建统计 |
| | GET | `/api/v2/statistics/invocations` | 调用统计 |
| | GET | `/api/v2/statistics/agent-categories` | 分类分布 |
| | GET | `/api/v2/statistics/top-agents` | 热门 Agent |
| | GET | `/api/v2/statistics/recent-activities` | 最近活动 |
| | GET | `/api/v2/statistics/system-health` | 系统健康 |
| **工具** | GET | `/api/v2/tools/categories` | 工具分类 |
| | GET | `/api/v2/tools/list` | 工具列表 |
| | GET | `/api/v2/tools/{name}` | 工具详情 |
| | POST | `/api/v2/tools/{name}/test` | 测试工具 |
| **MCP (Manager)** | GET | `/api/v2/mcp/servers` | 服务器列表 |
| | GET | `/api/v2/mcp/servers/{name}` | 服务器详情 |
| | POST | `/api/v2/mcp/servers/import` | 导入配置 |
| | POST | `/api/v2/mcp/servers` | 创建服务器 |
| | PUT | `/api/v2/mcp/servers/{name}` | 更新服务器 |
| | DELETE | `/api/v2/mcp/servers/{name}` | 删除服务器 |
| | POST | `/api/v2/mcp/servers/{name}/test` | 测试连接 |
| | GET | `/api/v2/mcp/servers/{name}/tools` | 服务器工具 |
| | POST | `/api/v2/mcp/servers/{name}/enable` | 启用服务器 |
| | POST | `/api/v2/mcp/servers/{name}/disable` | 禁用服务器 |
| **MCP (Tools)** | GET | `/api/v2/tools/mcp/servers` | 服务器列表 |
| | GET | `/api/v2/tools/mcp/servers/{name}` | 服务器详情 |
| | POST | `/api/v2/tools/mcp/servers` | 创建服务器 |
| | PUT | `/api/v2/tools/mcp/servers/{name}` | 更新配置 |
| | DELETE | `/api/v2/tools/mcp/servers/{name}` | 删除服务器 |
| | POST | `/api/v2/tools/mcp/servers/{name}/enable` | 启用服务器 |
| | POST | `/api/v2/tools/mcp/servers/{name}/disable` | 禁用服务器 |
| | POST | `/api/v2/tools/mcp/servers/{name}/test` | 测试连接 |
| | GET | `/api/v2/tools/mcp/servers/{name}/tools` | 服务器工具 |
| **工作流** | POST | `/api/v2/workflows/agent-update` | Agent 更新 |
| | POST | `/api/v2/workflows/agents/{id}/update` | 更新 Agent |
| | POST | `/api/v2/workflows/tool-build` | 工具构建 |
| | GET | `/api/v2/workflows/{id}/status` | 工作流状态 |
| | GET | `/api/v2/workflows/types` | 工作流类型 |
| **工作流控制** | POST | `/api/v2/workflow/{id}/pause` | 暂停 |
| | POST | `/api/v2/workflow/{id}/resume` | 恢复 |
| | POST | `/api/v2/workflow/{id}/stop` | 停止 |
| | POST | `/api/v2/workflow/{id}/restart` | 重启 |
| | GET | `/api/v2/workflow/{id}/status` | 状态查询 |
| | GET | `/api/v2/workflow/{id}/stages/{stage}` | 阶段状态 |
| | GET | `/api/v2/workflow/{id}/metrics` | 指标查询 |
| | GET | `/api/v2/workflow/{id}/stages/{stage}/output` | 阶段输出 |
| | GET | `/api/v2/workflow/{id}/multi-agent/progress` | 多 Agent 进度 |
| | GET | `/api/v2/workflow/{id}/multi-agent/agents/{name}/progress` | Agent 进度 |
| | GET | `/api/v2/workflow/{id}/files` | 文件列表 |
| | GET | `/api/v2/workflow/{id}/files/{path}` | 文件内容 |
| **配置** | GET | `/api/v2/config` | 配置文件列表 |
| | GET | `/api/v2/config/{filename}` | 配置内容 |
| | PUT | `/api/v2/config/{filename}` | 更新配置 |
| | POST | `/api/v2/config/{filename}/validate` | 验证配置 |
| | POST | `/api/v2/config/{filename}/restore` | 恢复备份 |
| **Agent 图谱** | GET | `/api/v2/agent-graph` | 关系图 |
| | GET | `/api/v2/agent-graph/node/{id}` | 节点详情 |
| | GET | `/api/v2/agent-graph/stats` | 图统计 |
| **AgentCore** | POST | `/api/v2/agentcore/stream` | 流式调用 |

### 17.2 端点统计

| 分组 | 端点数量 |
|------|----------|
| 系统 | 2 |
| 认证 | 4 |
| Agent 管理 | 8 |
| Agent 文件 | 7 |
| 项目管理 | 11 |
| 会话管理 | 8 |
| 任务管理 | 1 |
| 统计数据 | 7 |
| 工具管理 | 4 |
| MCP (Manager) | 10 |
| MCP (Tools) | 9 |
| 工作流管理 | 5 |
| 工作流控制 | 12 |
| 配置管理 | 5 |
| Agent 图谱 | 3 |
| AgentCore | 1 |
| **总计** | **97** |

---

## 18. 相关文档

- [API 系统模块文档](../modules/06-api-system.md)
- [内部 API 参考](./internal-apis.md)
- [MCP 工具参考](./mcp-tools-reference.md)
- [系统架构文档](../architecture/system-architecture.md)
- [数据流设计](../architecture/data-flow.md)

---

**文档版本**: 1.0  
**最后更新**: 2026-02-05  
**维护者**: Nexus-AI 团队
