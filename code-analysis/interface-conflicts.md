# 接口冲突分析报告

**生成时间**: 2026-02-06 00:44:37
**分析版本**: v1.0

## 执行摘要

- **接口冲突数量**: 143 个
- **总体评估**: 需要修复

## 1. 参数不一致

### 1.1 __init__

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/config_loader.py:20` - `(self, config_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/strands_agent_logging_hook.py:100` - `(self, agent_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/prompts_manager.py:133` - `(self, prompt_paths)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:133` - `(self, base_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_report_generator.py:90` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_config.py:266` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/project_info_collector.py:68` - `(self, project_root_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/magician.py:19` - `(self, user_input)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:313` - `(self, config_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/agent_graph/loader.py:52` - `(self, prompts_base_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/image_processor.py:38` - `(self, multimodal_service)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/s3_storage_service.py:29` - `(self, bucket_name, aws_region, s3_prefix, max_retries, retry_delay, presigned_url_expiration)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/text_processor.py:40` - `(self, multimodal_service)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/document_processor.py:42` - `(self, multimodal_service)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/markdown_generator.py:24` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/multimodal_model_service.py:31` - `(self, aws_region, model_config)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/file_upload_manager.py:36` - `(self, config)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/content_parsing_engine.py:35` - `(self, multimodal_service, max_workers, processing_timeout)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/error_handler.py:77` - `(self, logger)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/manager.py:45` - `(self, config_dir, config_files)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/main.py:64` - `(self, base_path, language)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/validator.py:109` - `(self, project_root)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/file_sync.py:73` - `(self, db_client)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/file_sync.py:297` - `(self, config)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/multi_agent.py:61` - `(self, context)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/multi_agent.py:486` - `(self, context, iterator, on_agent_start, on_agent_complete)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/engine.py:69` - `(self, signal_type, message)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/engine.py:80` - `(self, stage_name, missing_prerequisites)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/engine.py:107` - `(self, project_id, config, db_client)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/context.py:157` - `(self, db_client)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/executor.py:67` - `(self, stage_name, message, recoverable)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/executor.py:94` - `(self, context, context_manager, on_stage_start, on_stage_complete, on_stage_error, enable_multi_agent, workflow_type)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/agent_validator.py:135` - `(self, project_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/config/build_config_loader.py:13` - `(self, config_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/infrastructure_manager.py:60` - `(self, region, dynamodb_endpoint, sqs_endpoint)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/cloud_resource_manager.py:113` - `(self, region)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/service_manager.py:57` - `(self, base_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/deployment_manager.py:36` - `(self, base_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/workflow_manager.py:47` - `(self, fs, config, api_base_url)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/build_manager.py:21` - `(self, fs, config)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/artifact_manager.py:120` - `(self, fs_adapter, config_loader)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/base.py:12` - `(self, fs_adapter, config_loader)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/adapters/config_loader.py:12` - `(self, fs_adapter)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/adapters/filesystem.py:15` - `(self, base_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/adapters/docker_adapter.py:14` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/adapters/ecr_adapter.py:11` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/models/exceptions.py:16` - `(self, message, error_code, context)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/multi_agent/stock_analysis_agent.py:56` - `(self, env, version, model_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/multi_agent/tech_doc_swarm.py:72` - `(self, env, version, model_id, max_review_iterations)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/aws_pricing_agent/aws_pricing_agent.py:79` - `(self, agent)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/stock_analysis_agent/stock_analysis_agent.py:56` - `(self, env, version, model_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/multi_cloud_pricing_comparison_agent/multi_cloud_pricing_comparison_agent.py:114` - `(self, agent)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/logo_design_agent/logo_designer.py:57` - `(self, env, version, model_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/clinicaltrials_search_agent/clinicaltrials_search_agent.py:125` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/multimodal_content_parser.py:48` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tool_build_multi_search_engine/exceptions.py:11` - `(self, engine, message)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tool_build_multi_search_engine/exceptions.py:37` - `(self, message)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/multi_cloud_pricing_comparison_agent/aws_pricing_tools.py:36` - `(self, region)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/multi_cloud_pricing_comparison_agent/azure_pricing_tools.py:38` - `(self, api_endpoint)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tool_build_browser_automation/browser_viewer.py:27` - `(self, client, port)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tool_build_browser_automation/session_manager.py:20` - `(self, max_sessions)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tech_doc_multi_agent_system/document_structure_parser.py:45` - `(self, element_type, content, attributes, children, metadata)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tech_doc_multi_agent_system/html_generator.py:19` - `(self, style_config)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tech_doc_multi_agent_system/document_review_tools.py:23` - `(self, data)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_tool.py:43` - `(self, api_key)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_tool.py:62` - `(self, cache_dir, expiry_hours)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_tool.py:115` - `(self, api_key, use_cache)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/clinicaltrials_search_agent/clinicaltrials_api_tools.py:22` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tooluniverse/neo4j/create_knowledge_graph.py:16` - `(self, config_file)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_information.py:32` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_information.py:43` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_information.py:55` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_information.py:63` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:79` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/sqs.py:35` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/exceptions.py:9` - `(self, message, status_code, error_code, details, suggestion, docs_url)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/exceptions.py:29` - `(self, message, details)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/exceptions.py:42` - `(self, resource_type, resource_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/auth/config.py:59` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/scripts/init_resources.py:315` - `(self, endpoint_url)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/project_service.py:43` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/task_service.py:21` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_service.py:35` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_deployment_service.py:52` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/workflow_service.py:36` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/statistics_service.py:23` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/session_service.py:41` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:60` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/invocation_service.py:22` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/worker/main.py:42` - `(self, queue_type)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/worker/main.py:213` - `(self, stop_event, thread)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/worker/handlers/build_handler.py:42` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/worker/handlers/workflow_handler.py:38` - `(self)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.2 get

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/config_loader.py:87` - `(self, key, default)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/config/build_config_loader.py:36` - `(self, key_path, default)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_tool.py:76` - `(self, url, params)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.3 get_workflow_config

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/config_loader.py:269` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_config.py:445` - `(workflow_type)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/stage_config.py:43` - `(workflow_type)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.4 get_workflow_stages

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/config_loader.py:306` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/stage_config.py:398` - `(workflow_type)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.5 __new__

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/prompts_manager.py:128` - `(cls, prompt_paths)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_config.py:261` - `(cls)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:72` - `(cls)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/sqs.py:28` - `(cls)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.6 get_agent

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/prompts_manager.py:315` - `(self, agent_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:531` - `(self, name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/agent_manager.py:43` - `(self, name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:300` - `(self, agent_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_service.py:332` - `(self, agent_id)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.7 get_instance

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/prompts_manager.py:540` - `(cls, prompt_paths)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:528` - `(cls, config_path)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.8 sync_project_to_s3

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:1515` - `(project_id, project_name, base_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:854` - `(self, project_id, project_name, include_agents, include_tools, include_prompts)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.9 sync_project_from_s3

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:1535` - `(project_id, project_name, base_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:1040` - `(self, project_id, project_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.10 check_project_sync_status

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:1555` - `(project_id, project_name, base_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:970` - `(self, project_id, project_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.11 ensure_project_available

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:1575` - `(project_id, project_name, base_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:1154` - `(self, project_id, project_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.12 _load_project_config

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_report_generator.py:95` - `(self, project_dir)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_update_workflow/agent_update_workflow.py:68` - `(project_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_deployment_service.py:277` - `(self, project_dir)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.13 _format_markdown_report

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_report_generator.py:708` - `(self, summary)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/drug_feedback_collector/drug_feedback_tools.py:975` - `(report)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.14 get_stage

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_config.py:125` - `(self, stage_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:247` - `(self, project_id, stage_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:431` - `(self, project_id, stage_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.15 normalize_stage_name

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_config.py:145` - `(self, stage_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/stage_config.py:188` - `(stage_name, workflow_type)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.16 get_stage_display_name

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_config.py:199` - `(self, stage_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/stage_config.py:217` - `(stage_name, workflow_type)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.17 get_prompt_path

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_config.py:212` - `(self, stage_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/stage_config.py:248` - `(stage_name, workflow_type)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.18 get_cache_info

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/magician.py:31` - `(cls)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/html2pptx/cache_manager.py:545` - `(cache_dir, include_items)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.19 get_magician_agent

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/magician.py:115` - `(self, template_path, nocallback, custom_params)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/magician.py:35` - `(template_path)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.20 create_client_sync

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:233` - `(config)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:486` - `(self, server_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.21 _parse_server_config

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:378` - `(self, server_name, server_config)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/parser.py:171` - `(name, config)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.22 get_tool_details

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/agent_graph/loader.py:382` - `(self, tool_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/tool_template_provider.py:528` - `(tool_name, tool_type)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.23 delete_file

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/s3_storage_service.py:443` - `(self, file_id, file_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/adapters/filesystem.py:118` - `(self, path)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.24 get_file_metadata

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/s3_storage_service.py:561` - `(self, file_id, file_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/file_sync.py:176` - `(self, project_id, stage_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.25 _generate_header

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/markdown_generator.py:63` - `(self, file_results, files_metadata)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tech_doc_multi_agent_system/html_generator.py:350` - `(self, document_tree)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.26 _process_single_file

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/file_upload_manager.py:139` - `(self, file_data, index)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/content_parsing_engine.py:200` - `(self, file_metadata)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.27 create_client

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/manager.py:451` - `(self, name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/client_factory.py:28` - `(config)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.28 project_init

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/main.py:335` - `(ctx, name, description, dry_run)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_manager.py:240` - `(project_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.29 validate_document

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/validator.py:589` - `(stage_name, content)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/validator.py:401` - `(self, stage_name, content)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.30 add_error

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/validator.py:70` - `(self, error)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/common.py:47` - `(self, message)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.31 add_warning

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/validator.py:75` - `(self, warning)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/common.py:52` - `(self, message)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.32 get_file_content

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/file_sync.py:543` - `(project_id, file_path, project_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/file_sync.py:244` - `(self, project_id, file_path, project_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.33 _get_stage_sequence

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:20` - `(workflow_type)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/stage_tracker.py:21` - `()`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.34 get_stage_output

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:823` - `(self, stage_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:438` - `(self, project_id, stage_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.35 update_stage_output

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:835` - `(self, stage_name, output)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/context.py:676` - `(self, context, stage_name, output)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.36 run_workflow

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/engine.py:589` - `(project_id, from_stage, to_completion, state)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_build_workflow/agent_build_workflow.py:358` - `(user_input, session_id, project_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.37 get_status

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/engine.py:553` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/service_manager.py:190` - `(self, service)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tool_build_browser_automation/browser_viewer.py:110` - `(self)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.38 get_stage_context

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/context.py:753` - `(context, stage_name, include_rules, include_local_docs, max_tokens)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/context.py:496` - `(self, context, stage_name, include_rules, include_local_docs, max_tokens)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.39 execute_stage

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/executor.py:641` - `(context, stage_name, input_message, state)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/executor.py:273` - `(self, stage_name, input_message, state)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.40 create_agent

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/executor.py:195` - `(self, stage_name, state)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:291` - `(self, agent_data)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.41 get_build_config

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/config/build_config_loader.py:303` - `(config_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/config/build_config_loader.py:133` - `(self)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.42 create_table

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/infrastructure_manager.py:341` - `(self, table_def)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/scripts/init_resources.py:344` - `(self, table_name, definition)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.43 create_queue

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/infrastructure_manager.py:379` - `(self, queue_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/scripts/init_resources.py:428` - `(self, queue_name, definition)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.44 _get_ecr_client

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/cloud_resource_manager.py:155` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/adapters/ecr_adapter.py:24` - `(self, region)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.45 _delete_agent_sessions

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/cloud_resource_manager.py:464` - `(self, db_client, agent_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_service.py:656` - `(self, agent_id)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.46 _get_db_client

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/deployment_manager.py:47` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/stage_tracker.py:51` - `()`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.47 get_project_status

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/deployment_manager.py:61` - `(self, project_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_build_workflow/run_workflow_v2.py:396` - `(project_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_manager.py:900` - `(project_name, agent_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.48 deploy_to_agentcore

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/deployment_manager.py:204` - `(self, project_name, region, dry_run)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_deployment_service.py:60` - `(self)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.49 update_project_status

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/deployment_manager.py:274` - `(self, project_id, status)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_manager.py:644` - `(project_name, agent_name, stage, status, doc_path, agent_artifact_path)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.50 _make_request

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/workflow_manager.py:59` - `(self, method, endpoint, data, params)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_tool.py:121` - `(self, endpoint, params)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/clinicaltrials_search_agent/clinicaltrials_api_tools.py:66` - `(self, endpoint, params, use_cache)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.51 list_agents

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/agent_manager.py:16` - `(self, project)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:325` - `(self, status, category, limit, last_key)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_service.py:434` - `(self, status, category, page, limit)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.52 list_projects

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/project_manager.py:21` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:189` - `(self, status, user_id, limit, last_key)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/project_service.py:400` - `(self, status, user_id, page, limit, sort_by, sort_order)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.53 get_project

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/project_manager.py:43` - `(self, name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:164` - `(self, project_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/project_service.py:352` - `(self, project_id)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.54 create_project

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/project_manager.py:213` - `(self, name, config)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:155` - `(self, project_data)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/project_service.py:190` - `(self, request)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.55 update_project

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/project_manager.py:241` - `(self, name, config)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:171` - `(self, project_id, updates)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.56 delete_project

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/project_manager.py:249` - `(self, name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:233` - `(self, project_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/project_service.py:1134` - `(self, project_id, delete_local_files)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.57 generate

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/build.py:103` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tech_doc_multi_agent_system/html_generator.py:24` - `(self, document_tree)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.58 get_image_info

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/adapters/docker_adapter.py:153` - `(self, tag)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/html2pptx/image_processor.py:661` - `(image_path, include_exif, include_base64, base64_max_size_kb)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.59 _parse_agent_response

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/multi_agent/stock_analysis_agent.py:205` - `(self, response)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/multi_agent/tech_doc_swarm.py:504` - `(self, response)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/stock_analysis_agent/stock_analysis_agent.py:163` - `(self, response)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/stock_analysis_agent/multi_agent_as_tools.py:41` - `(response)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.60 handler

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/multi_agent/tech_doc_swarm.py:1042` - `(event, context)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/drug_feedback_collector/drug_feedback_collector.py:176` - `(payload)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.61 clear_cache

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/single_agent/html2pptx_agent.py:285` - `(verbose)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/html2pptx/html2pptx_agent.py:232` - `(verbose)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/html2pptx/cache_manager.py:446` - `(cache_dir, category, older_than_days)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/drug_feedback_collector/drug_feedback_tools.py:837` - `(drug_name, older_than_days)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/fda_data_query_agent/fda_support_tools.py:264` - `(cache_dir, query_type, older_than_hours)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/lifescience_news_collector/storage_tools.py:912` - `(cache_dir, older_than_hours)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.62 generate_quality_report

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/medical_document_translation_agent/medical_translator.py:205` - `(source_file_path, translated_file_path, source_lang, target_lang, glossary_name, domain)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/medical_document_translation_agent/quality_controller.py:381` - `(source_text, translated_text, source_lang, target_lang, glossary_name, domain, cache_dir)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.63 search

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/clinicaltrials_search_agent/clinicaltrials_search_agent.py:133` - `(self, query, max_results, search_depth, study_types, phases, status, date_range, report_type, clear_context)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tool_build_multi_search_engine/multi_search_engine.py:28` - `(query, engine, num_results, language, region, timeout, format, include_metadata)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_tool.py:201` - `(self, query, retmax, retstart, sort, min_date, max_date)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.64 get_processing_status

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/multimodal_content_parser.py:431` - `()`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/literature_analysis_agent/literature_batch_processor.py:338` - `(research_id)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.65 _convert_to_markdown

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/stock_analysis_agent/report_generation_tools.py:573` - `(symbol, report)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/template_tools/common/research_tools.py:535` - `(report)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.66 _convert_to_html

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/stock_analysis_agent/report_generation_tools.py:584` - `(symbol, report)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/template_tools/common/research_tools.py:654` - `(report)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.67 analyze_document_structure

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/html2pptx/semantic_analyzer.py:29` - `(html_content, parser, max_depth)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/html2pptx/html_parser.py:479` - `(html_content, parser, detailed)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.68 extract_key_content

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/html2pptx/semantic_analyzer.py:109` - `(html_content, parser, content_type)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/Nexus-AI-QA-Assistant/multimodal_content_parser.py:1095` - `(content, content_type, extraction_rules)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.69 _extract_keywords

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/html2pptx/semantic_analyzer.py:1179` - `(text, max_keywords)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tech_doc_multi_agent_system/document_generation_tools.py:133` - `(text)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.70 _generate_improvement_suggestions

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/medical_document_translation_agent/quality_controller.py:1480` - `(terminology_consistency, abbreviation_handling, uncertain_translations, quality_dimensions)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tech_doc_multi_agent_system/document_review_tools.py:1219` - `(quality_scores, issues)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.71 save_to_cache

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/drug_feedback_collector/drug_feedback_tools.py:783` - `(drug_name, data, cache_type)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/lifescience_news_collector/storage_tools.py:792` - `(cache_key, data, cache_dir, ttl_hours)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.72 _generate_cache_key

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/fda_data_query_agent/fda_support_tools.py:48` - `(query_params)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_integration.py:47` - `(url, params)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.73 web_search

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/logo_design_agent/logo_design_tools.py:678` - `(query, search_type, max_results, include_images)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/template_tools/network/web_search_tool.py:14` - `(query, max_results)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.74 start

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tool_build_browser_automation/browser_viewer.py:44` - `(self, open_browser, display_size)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/worker/main.py:63` - `(self, once)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.75 generate_presigned_url

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/lifescience_news_collector/storage_tools.py:217` - `(bucket_name, object_key, expiration, region)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/report_generator.py:430` - `(s3_bucket, s3_key, expiration, region, profile_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.76 parse_user_requirement

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tech_doc_multi_agent_system/document_writer_tools.py:22` - `(requirement, additional_context)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tech_doc_multi_agent_system/document_generation_tools.py:16` - `(user_input, requirement_type)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.77 pubmed_search

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_tool.py:265` - `(query, max_results, sort_by, min_date, max_date, optimize_query)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_integration.py:245` - `(query, max_results, sort_by, publication_date_range, use_cache)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.78 pubmed_advanced_search

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_tool.py:538` - `(query_terms, filters, max_results, sort_by)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_integration.py:539` - `(keywords, authors, journal, publication_date_range, article_types, mesh_terms, max_results, page, use_cache)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.79 pubmed_rank_articles

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_tool.py:1091` - `(pmids, ranking_factors)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_integration.py:697` - `(pmids, ranking_factors, use_cache)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.80 _get_cached_response

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_integration.py:54` - `(cache_key)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/clinicaltrials_search_agent/clinicaltrials_api_tools.py:32` - `(self, cache_key)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.81 _cache_response

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_integration.py:63` - `(cache_key, data)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/clinicaltrials_search_agent/clinicaltrials_api_tools.py:51` - `(self, cache_key, response_data)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.82 mark_stage_running

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/stage_tracker.py:112` - `(project_id, stage_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:575` - `(project_id, stage_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:93` - `(self, project_id, stage_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.83 mark_stage_completed

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/stage_tracker.py:139` - `(project_id, stage_name, output_data, doc_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:580` - `(project_id, stage_name, output_data, doc_path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:156` - `(self, project_id, stage_name, output_data, doc_path, agent_output_content, metrics, generated_files, design_document)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.84 mark_stage_failed

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/stage_tracker.py:162` - `(project_id, stage_name, error_message)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:590` - `(project_id, stage_name, error_message)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:354` - `(self, project_id, stage_name, error_message, metrics)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.85 _normalize_stage_name

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_update_workflow/version_manager.py:74` - `(stage_name)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:63` - `(self, stage_name)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.86 _to_relative_path

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_update_workflow/version_manager.py:107` - `(path)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_deployment_service.py:931` - `(self, path)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.87 _now

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/sessions.py:41` - `()`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/tasks.py:19` - `()`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/config.py:39` - `()`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agents.py:32` - `()`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agent_files.py:24` - `()`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/workflows.py:30` - `()`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/statistics.py:25` - `()`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/projects.py:47` - `()`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agent_tools.py:26` - `()`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/workflow_service.py:40` - `(self)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:77` - `(self)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.88 delete_agent

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:369` - `(self, agent_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_service.py:620` - `(self, agent_id, delete_related)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.89 create_session

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:413` - `(self, session_data)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/session_service.py:44` - `(self, agent_id, user_id, display_name, metadata)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.90 get_stage_number

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/stage_config.py:232` - `(stage_name, workflow_type)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/models/schemas.py:99` - `(cls, stage)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.91 _initialize_stages

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/project_service.py:303` - `(self, project_id)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/workflow_service.py:79` - `(self, project_id, workflow_type)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

### 1.92 record_invocation

**严重程度**: high

**不同的参数定义**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_service.py:554` - `(self, agent_id, session_id, input_text, output_text, status, duration_ms, input_tokens, output_tokens, error_message, metadata)`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/invocation_service.py:81` - `(self, agent_id, session_id, input_tokens, output_tokens, conversation_turns, duration_ms, status, model_id, deployment_type, tool_calls_count, started_at, completed_at, error_message, invocation_id)`

**统一方案**:

- 确定标准参数列表
- 更新所有实现
- 添加参数验证

## 2. 返回类型不一致

### 2.1 get

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/config_loader.py:87` - `Any`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/config/build_config_loader.py:36` - `Any`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_tool.py:76` - `Optional[Dict[str, Any]]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.2 get_workflow_config

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/config_loader.py:269` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_config.py:445` - `Optional[WorkflowConfig]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/stage_config.py:43` - `WorkflowConfig`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.3 get_workflow_stages

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/config_loader.py:306` - `list`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/stage_config.py:398` - `List[str]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.4 get_agent

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/prompts_manager.py:315` - `Optional[PromptAgent]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:531` - `Optional[AgentDefinition]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/agent_manager.py:43` - `Optional[Agent]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:300` - `Optional[Dict[str, Any]]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_service.py:332` - `Optional[Dict[str, Any]]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.5 get_instance

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/prompts_manager.py:540` - `PromptManager`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:528` - `MCPManager`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.6 get_default_instance

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/prompts_manager.py:552` - `PromptManager`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:543` - `MCPManager`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.7 to_dict

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:52` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:77` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:100` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/agent_graph/models.py:51` - `dict`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/agent_graph/models.py:87` - `dict`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/agent_graph/models.py:114` - `dict`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/agent_graph/models.py:142` - `dict`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/models.py:105` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/validator.py:87` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:160` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:214` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:316` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:406` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:473` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:544` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:617` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:679` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:880` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/agent_validator.py:58` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/agent_validator.py:107` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/cloud_resource_manager.py:66` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/artifact_manager.py:24` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/artifact_manager.py:49` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/artifact_manager.py:88` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/build.py:53` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/backup.py:22` - `dict`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/backup.py:60` - `dict`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/common.py:28` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/common.py:60` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/agent.py:20` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/agent.py:44` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/template.py:17` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/prompt.py:18` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/tool.py:18` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/project.py:18` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/project.py:36` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/project.py:79` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tech_doc_multi_agent_system/document_structure_parser.py:67` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_deployment_service.py:37` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_cli_workflow_service.py:35` - `Dict[str, Any]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.8 from_dict

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:82` - `'ArtifactVersion'`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/models.py:145` - `'MCPServerConfig'`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:177` - `'StageMetrics'`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:229` - `'FileMetadata'`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:337` - `'StageOutput'`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:425` - `'IntentRecognitionResult'`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:486` - `'AgentDefinition'`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:554` - `'MultiAgentArchitecture'`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:629` - `'AgentStageProgress'`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:696` - `'AggregatedMetrics'`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:909` - `'WorkflowContext'`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/build.py:37` - `'BuildConfig'`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/backup.py:35` - `'BackupManifest'`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.9 list_all_versions

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:719` - `List[ArtifactVersion]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/artifact_manager.py:199` - `List[VersionInfo]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.10 get_version_detail

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:756` - `Optional[ArtifactVersion]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/artifact_manager.py:257` - `Optional[VersionInfo]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.11 _load_project_config

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_report_generator.py:95` - `tuple[Optional[Dict[str, Any]], int]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_update_workflow/agent_update_workflow.py:68` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_deployment_service.py:277` - `Dict[str, Any]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.12 get_stage

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_config.py:125` - `Optional[StageConfig]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:247` - `Optional[Dict[str, Any]]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:431` - `Optional[Dict[str, Any]]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.13 create_client_sync

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:233` - `MCPClient`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:486` - `Optional[MCPClient]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.14 _parse_server_config

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:378` - `None`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/parser.py:171` - `MCPServerConfig`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.15 get_tool_details

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/agent_graph/loader.py:382` - `Optional[dict]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/tool_template_provider.py:528` - `str`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.16 get_file_metadata

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/s3_storage_service.py:561` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/file_sync.py:176` - `List[FileMetadata]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.17 health_check

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/multimodal_model_service.py:561` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:714` - `bool`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/sqs.py:367` - `bool`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.18 _process_single_file

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/file_upload_manager.py:139` - `FileMetadata`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/content_parsing_engine.py:200` - `ProcessedContent`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.19 _get_project_root

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/validator.py:25` - `Path`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/file_sync.py:28` - `Path`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/context.py:42` - `Path`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/executor.py:48` - `Path`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/agent_validator.py:27` - `Path`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agent_files.py:32` - `FilePath`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agent_tools.py:34` - `FilePath`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/project_service.py:34` - `Path`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_service.py:26` - `Path`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.20 validate_tool_path

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/validator.py:574` - `Tuple[bool, str]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/tool_validator.py:30` - `str`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.21 _get_stage_sequence

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:20` - `List[str]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/stage_tracker.py:21` - `List[Tuple[str, str]]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.22 get_stage_output

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:823` - `Optional[StageOutput]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:438` - `Optional[Dict[str, Any]]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.23 get_status

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/engine.py:553` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/service_manager.py:190` - `ServiceInfo`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tool_build_browser_automation/browser_viewer.py:110` - `dict`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.24 get_build_config

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/config/build_config_loader.py:303` - `BuildConfigLoader`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/config/build_config_loader.py:133` - `Dict[str, Any]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.25 create_table

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/infrastructure_manager.py:341` - `Tuple[bool, str]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/scripts/init_resources.py:344` - `bool`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.26 create_queue

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/infrastructure_manager.py:379` - `Tuple[bool, str]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/scripts/init_resources.py:428` - `str`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.27 get_task

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/infrastructure_manager.py:867` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:386` - `Optional[Dict[str, Any]]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/task_service.py:24` - `Optional[Dict[str, Any]]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.28 get_project_status

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/deployment_manager.py:61` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_build_workflow/run_workflow_v2.py:396` - `dict`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_manager.py:900` - `str`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.29 deploy_to_agentcore

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/deployment_manager.py:204` - `DeploymentStatus`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_deployment_service.py:60` - `DeploymentResult`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.30 update_project_status

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/deployment_manager.py:274` - `bool`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_manager.py:644` - `str`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.31 get_workflow_status

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/workflow_manager.py:224` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/workflow_service.py:342` - `Optional[Dict[str, Any]]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.32 list_agents

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/agent_manager.py:16` - `List[Agent]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:325` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_service.py:434` - `Dict[str, Any]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.33 list_projects

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/project_manager.py:21` - `List[Project]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:189` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/project_service.py:400` - `Dict[str, Any]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.34 get_project

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/project_manager.py:43` - `Optional[Project]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:164` - `Optional[Dict[str, Any]]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/project_service.py:352` - `Optional[Dict[str, Any]]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.35 create_project

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/project_manager.py:213` - `Project`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:155` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/project_service.py:190` - `Dict[str, Any]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.36 update_project

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/project_manager.py:241` - `Optional[Project]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:171` - `Dict[str, Any]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.37 get_image_info

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/adapters/docker_adapter.py:153` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/html2pptx/image_processor.py:661` - `str`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.38 _parse_agent_response

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/multi_agent/stock_analysis_agent.py:205` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/multi_agent/tech_doc_swarm.py:504` - `Optional[Dict[str, Any]]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/stock_analysis_agent/stock_analysis_agent.py:163` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/stock_analysis_agent/multi_agent_as_tools.py:41` - `str`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.39 handler

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/multi_agent/tech_doc_swarm.py:1042` - `Dict[str, Any]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/drug_feedback_collector/drug_feedback_collector.py:176` - `str`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.40 clear_cache

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/single_agent/html2pptx_agent.py:285` - `bool`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/html2pptx/html2pptx_agent.py:232` - `bool`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/html2pptx/cache_manager.py:446` - `str`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/drug_feedback_collector/drug_feedback_tools.py:837` - `str`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/fda_data_query_agent/fda_support_tools.py:264` - `str`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/lifescience_news_collector/storage_tools.py:912` - `str`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.41 search

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/clinicaltrials_search_agent/clinicaltrials_search_agent.py:133` - `str`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tool_build_multi_search_engine/multi_search_engine.py:28` - `str`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/pubmed_search_agent/pubmed_api_tool.py:201` - `Dict[str, Any]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.42 get_processing_status

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/multimodal_content_parser.py:431` - `str`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/literature_analysis_agent/literature_batch_processor.py:338` - `Dict[str, Any]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.43 _extract_keywords

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/html2pptx/semantic_analyzer.py:1179` - `List[Dict[str, Any]]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tech_doc_multi_agent_system/document_generation_tools.py:133` - `List[str]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.44 get_pricing_client

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/multi_cloud_pricing_comparison_agent/aws_pricing_tools.py:135` - `AWSPricingClient`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/multi_cloud_pricing_comparison_agent/azure_pricing_tools.py:129` - `AzurePricingClient`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.45 get_session

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tool_build_browser_automation/session_manager.py:54` - `Optional[BrowserClient]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:422` - `Optional[Dict[str, Any]]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/session_service.py:73` - `Optional[Dict[str, Any]]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.46 mark_stage_running

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/stage_tracker.py:112` - `bool`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:575` - `None`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:93` - `bool`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.47 mark_stage_completed

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/stage_tracker.py:139` - `None`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:580` - `None`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:156` - `bool`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.48 mark_stage_failed

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/stage_tracker.py:162` - `None`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:590` - `None`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:354` - `bool`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.49 _normalize_stage_name

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_update_workflow/version_manager.py:74` - `str`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:63` - `Optional[str]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.50 delete_session

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:458` - `bool`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/session_service.py:125` - `Dict[str, Any]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

### 2.51 get_agent_statistics

**严重程度**: medium

**不同的返回类型**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:658` - `Optional[Dict[str, Any]]`
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/invocation_service.py:187` - `Dict[str, Any]`

**统一方案**:

- 确定标准返回类型
- 添加类型注解
- 更新文档

## 3. 修复优先级

### 高优先级 (立即修复)
- 公共API的接口冲突
- 核心模块的接口不一致

### 中优先级 (计划修复)
- 内部工具函数的不一致
- 辅助模块的接口问题

### 低优先级 (可选修复)
- 测试代码的接口差异
- 临时脚本的不一致

## 4. 实施建议

1. **制定接口规范**: 创建统一的接口设计指南
2. **类型注解**: 为所有公共函数添加类型注解
3. **接口文档**: 维护详细的API文档
4. **代码审查**: 在审查中检查接口一致性
5. **自动化检查**: 使用mypy等工具进行类型检查
