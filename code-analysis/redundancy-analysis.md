# 冗余代码分析报告

**生成时间**: 2026-02-06 00:44:37
**分析版本**: v1.0

## 执行摘要

- **重复函数**: 45 个
- **重复类**: 26 个
- **总体评估**: 需要重构

## 1. 重复函数分析

### 1.1 to_dict(self)

**严重程度**: medium
**出现次数**: 3

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:52` - to_dict
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:77` - to_dict
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:100` - to_dict

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.2 format_size(self)

**严重程度**: medium
**出现次数**: 3

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:104` - format_size
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/artifact_manager.py:64` - format_size
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/artifact_manager.py:102` - format_size

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.3 __init__(self)

**严重程度**: medium
**出现次数**: 5

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/task_service.py:21` - __init__
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/statistics_service.py:23` - __init__
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/session_service.py:41` - __init__
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:60` - __init__
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/invocation_service.py:22` - __init__

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.4 __new__(cls)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/dynamodb.py:72` - __new__
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/database/sqs.py:28` - __new__

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.5 create_connection()

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:215` - create_connection
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:259` - create_connection

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.6 get_supported_types(self)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/image_processor.py:68` - get_supported_types
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/text_processor.py:67` - get_supported_types

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.7 _get_project_root()

**严重程度**: medium
**出现次数**: 5

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/validator.py:25` - _get_project_root
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/file_sync.py:28` - _get_project_root
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/context.py:42` - _get_project_root
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/executor.py:48` - _get_project_root
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/agent_validator.py:27` - _get_project_root

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.8 _get_project_root()

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agent_files.py:32` - _get_project_root
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agent_tools.py:34` - _get_project_root

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.9 _get_project_root()

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/project_service.py:34` - _get_project_root
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/agent_service.py:26` - _get_project_root

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.10 db(self)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/file_sync.py:84` - db
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/context.py:168` - db

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.11 __init__(self, env, version, model_id)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/multi_agent/stock_analysis_agent.py:56` - __init__
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/stock_analysis_agent/stock_analysis_agent.py:56` - __init__

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.12 analyze_stock(self, symbol)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/multi_agent/stock_analysis_agent.py:137` - analyze_stock
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/stock_analysis_agent/stock_analysis_agent.py:95` - analyze_stock

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.13 _parse_agent_response(self, response)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/multi_agent/stock_analysis_agent.py:205` - _parse_agent_response
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/stock_analysis_agent/stock_analysis_agent.py:163` - _parse_agent_response

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.14 convert_html_to_pptx(html_path, output_path, template_path, use_cache, verbose)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/single_agent/html2pptx_agent.py:109` - convert_html_to_pptx
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/html2pptx/html2pptx_agent.py:56` - convert_html_to_pptx

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.15 analyze_html_structure(html_path, verbose)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/single_agent/html2pptx_agent.py:177` - analyze_html_structure
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/html2pptx/html2pptx_agent.py:124` - analyze_html_structure

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.16 suggest_ppt_structure(html_path, max_slides, verbose)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/single_agent/html2pptx_agent.py:230` - suggest_ppt_structure
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/html2pptx/html2pptx_agent.py:177` - suggest_ppt_structure

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.17 clear_cache(verbose)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/single_agent/html2pptx_agent.py:285` - clear_cache
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/html2pptx/html2pptx_agent.py:232` - clear_cache

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.18 _get_project_id()

**严重程度**: medium
**出现次数**: 3

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_build_workflow/tool_developer_agent.py:29` - _get_project_id
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_build_workflow/agent_code_developer_agent.py:31` - _get_project_id
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_build_workflow/prompt_engineer_agent.py:29` - _get_project_id

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.19 _wrap_with_sub_stage_tracking(agent, sub_stage_name)

**严重程度**: medium
**出现次数**: 3

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_build_workflow/tool_developer_agent.py:61` - _wrap_with_sub_stage_tracking
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_build_workflow/agent_code_developer_agent.py:63` - _wrap_with_sub_stage_tracking
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_build_workflow/prompt_engineer_agent.py:61` - _wrap_with_sub_stage_tracking

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.20 wrapped_call()

**严重程度**: medium
**出现次数**: 3

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_build_workflow/tool_developer_agent.py:74` - wrapped_call
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_build_workflow/agent_code_developer_agent.py:76` - wrapped_call
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/system_agents/agent_build_workflow/prompt_engineer_agent.py:74` - wrapped_call

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.21 _run_interactive_mode(self, initial_requirement)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/aws_pricing_agent/aws_pricing_agent.py:168` - _run_interactive_mode
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/multi_cloud_pricing_comparison_agent/multi_cloud_pricing_comparison_agent.py:218` - _run_interactive_mode

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.22 _safe_float(value)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/stock_analysis_agent/financial_analysis_tools.py:848` - _safe_float
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/stock_analysis_agent/financial_data_fetcher.py:829` - _safe_float

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.23 collect_vpc_endpoints(region, vpc_id, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part2.py:19` - collect_vpc_endpoints
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:363` - collect_vpc_endpoints

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.24 collect_security_groups(region, vpc_id, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part2.py:82` - collect_security_groups
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:426` - collect_security_groups

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.25 collect_network_acls(region, vpc_id, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part2.py:143` - collect_network_acls
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:487` - collect_network_acls

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.26 collect_ec2_instances(region, vpc_id, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part2.py:202` - collect_ec2_instances
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:546` - collect_ec2_instances

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.27 collect_rds_instances(region, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part3.py:19` - collect_rds_instances
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:670` - collect_rds_instances

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.28 collect_vpc_peering_connections(region, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part3.py:80` - collect_vpc_peering_connections
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:731` - collect_vpc_peering_connections

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.29 collect_vpn_connections(region, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part3.py:132` - collect_vpn_connections
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:783` - collect_vpn_connections

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.30 collect_direct_connect_connections(region, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part3.py:189` - collect_direct_connect_connections
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:840` - collect_direct_connect_connections

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.31 collect_network_firewalls(region, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part3.py:247` - collect_network_firewalls
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:898` - collect_network_firewalls

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.32 collect_vpcs(region, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:19` - collect_vpcs
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part1.py:19` - collect_vpcs

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.33 collect_subnets(region, vpc_id, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:74` - collect_subnets
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part1.py:74` - collect_subnets

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.34 collect_route_tables(region, vpc_id, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:138` - collect_route_tables
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part1.py:138` - collect_route_tables

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.35 collect_internet_gateways(region, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:197` - collect_internet_gateways
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part1.py:197` - collect_internet_gateways

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.36 collect_nat_gateways(region, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:247` - collect_nat_gateways
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part1.py:247` - collect_nat_gateways

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.37 collect_transit_gateways(region, profile_name)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector.py:301` - collect_transit_gateways
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/aws_network_architecture_analyzer/aws_resource_collector_part1.py:301` - collect_transit_gateways

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.38 verify_file_content(type, file_path)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_manager.py:1967` - verify_file_content
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_manager.py:2241` - verify_file_content

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.39 _utc_now()

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/tool_build_workflow/tool_project_manager.py:23` - _utc_now
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_update_workflow/version_manager.py:42` - _utc_now

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.40 _now()

**严重程度**: medium
**出现次数**: 9

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/sessions.py:41` - _now
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/tasks.py:19` - _now
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/config.py:39` - _now
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agents.py:32` - _now
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agent_files.py:24` - _now
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/workflows.py:30` - _now
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/statistics.py:25` - _now
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/projects.py:47` - _now
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agent_tools.py:26` - _now

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.41 _request_id()

**严重程度**: medium
**出现次数**: 9

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/sessions.py:45` - _request_id
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/tasks.py:23` - _request_id
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/config.py:43` - _request_id
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agents.py:36` - _request_id
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agent_files.py:28` - _request_id
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/workflows.py:34` - _request_id
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/statistics.py:29` - _request_id
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/projects.py:51` - _request_id
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agent_tools.py:30` - _request_id

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.42 _format_sse(data)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/sessions.py:389` - _format_sse
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agentcore.py:40` - _format_sse

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.43 _now(self)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/workflow_service.py:40` - _now
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/services/stage_service.py:77` - _now

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.44 _convert_execution_result(self, result)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/worker/handlers/build_handler.py:287` - _convert_execution_result
- `/Users/qangz/Downloads/99.Project/Nexus-AI/worker/handlers/workflow_handler.py:344` - _convert_execution_result

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

### 1.45 _update_task_status(self, task_id, status, result, error_message)

**严重程度**: medium
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/worker/handlers/build_handler.py:317` - _update_task_status
- `/Users/qangz/Downloads/99.Project/Nexus-AI/worker/handlers/workflow_handler.py:458` - _update_task_status

**重构建议**:

- 提取公共函数到工具模块
- 统一函数接口
- 删除重复实现

## 2. 重复类分析

### 2.1 ConfigLoader

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/config_loader.py:17` - 23 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/adapters/config_loader.py:9` - 7 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.2 SyncResult

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/artifact_sync.py:88` - 2 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/managers/artifact_manager.py:76` - 2 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.3 StageMetrics

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_report_generator.py:50` - 1 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:129` - 3 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.4 StageConfig

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_config.py:23` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/stage_config.py:101` - 1 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.5 WorkflowType

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow_config.py:239` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/models/workflow_schemas.py:14` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.6 MCPServerConfig

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:91` - 1 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/models.py:27` - 4 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.7 MCPClientFactory

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:132` - 2 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/client_factory.py:17` - 4 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.8 MCPManager

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp_manager.py:277` - 9 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/manager.py:36` - 19 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.9 GraphEdge

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/agent_graph/models.py:103` - 1 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/structured_output_model/agent_orchestration_result.py:23` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.10 ToolInfo

**严重程度**: high
**出现次数**: 3

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/api.py:70` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_information.py:53` - 1 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/agent_tools.py:51` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.11 ToolListResponse

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/api.py:329` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/models/schemas.py:646` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.12 ParseError

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/mcp/exceptions.py:43` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tool_build_multi_search_engine/exceptions.py:29` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.13 ValidationError

**严重程度**: high
**出现次数**: 3

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/validator.py:32` - 1 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/generated_tools/tool_build_multi_search_engine/exceptions.py:34` - 1 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/exceptions.py:26` - 1 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.14 ValidationResult

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/validator.py:55` - 4 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/common.py:40` - 4 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.15 StageStatus

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:90` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/models/schemas.py:36` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.16 ControlStatus

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:110` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/models/schemas.py:23` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.17 FileMetadata

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:197` - 2 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/multimodal_processing/models/data_models.py:11` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.18 IntentRecognitionResult

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/workflow/models.py:379` - 2 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/structured_output_model/project_intent_recognition.py:17` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.19 ProjectConfig

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/project.py:10` - 1 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/tools/system_tools/agent_build_workflow/project_information.py:61` - 1 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.20 ProjectStatus

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/nexus_utils/cli/models/project.py:30` - 1 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/models/schemas.py:12` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.21 StockAnalysisSystem

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/template_agents/multi_agent/stock_analysis_agent.py:53` - 5 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/agents/generated_agents/stock_analysis_agent/stock_analysis_agent.py:53` - 5 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.22 Settings

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/config.py:21` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/config.py:7` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.23 Config

**严重程度**: high
**出现次数**: 4

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/config.py:77` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/core/config.py:48` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/auth/config.py:56` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/worker/config.py:43` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.24 WorkflowStatusResponse

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/workflow_control.py:69` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/models/workflow_schemas.py:107` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.25 StageOutputResponse

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/routers/workflow_control.py:81` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/models/schemas.py:417` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

### 2.26 TaskType

**严重程度**: high
**出现次数**: 2

**位置**:

- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/models/workflow_schemas.py:22` - 0 个方法
- `/Users/qangz/Downloads/99.Project/Nexus-AI/api/v2/models/schemas.py:64` - 0 个方法

**重构建议**:

- 合并重复类定义
- 使用继承或组合
- 统一类接口

## 3. 重构优先级

### 高优先级
- 重复的核心类定义
- 重复的工具函数

### 中优先级
- 重复的辅助函数
- 相似的业务逻辑

### 低优先级
- 简单的工具函数
- 测试代码中的重复

## 4. 实施建议

1. **创建公共工具模块**: 将重复函数提取到 `nexus_utils/common/` 目录
2. **统一接口规范**: 确保相同功能的函数使用一致的接口
3. **代码审查**: 在代码审查中关注重复代码
4. **自动化检测**: 集成到CI/CD流程中
