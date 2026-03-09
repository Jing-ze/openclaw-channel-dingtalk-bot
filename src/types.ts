/**
 * Per-account configuration for a DingTalk robot.
 * Each account is fully self-contained with its own credentials and settings.
 */
export interface DingTalkAccountConfig {
  /** Optional display name for this account (used in CLI/UI lists). */
  name?: string;
  /** If false, do not start this DingTalk account. Default: true. */
  enabled?: boolean;
  /** DingTalk robot security key (required for signature validation). */
  secretKey: string;
  /**
   * Custom webhook path for this account.
   * If not specified, defaults to `/dingtalk-channel/{accountId}/message`.
   */
  webhookPath?: string;
  /** DingTalk robot access token for active outbound delivery. */
  accessToken?: string;
  /** Whether to block streaming mode. Default: true. */
  blockStreaming?: boolean;
  /** Tool progress notification mode for DM. Default: 'simple'. */
  toolProgress?: 'off' | 'simple';
  /** Tool progress notification mode for group chats. Default: 'simple'. */
  toolProgressInGroup?: 'off' | 'simple';
}

/**
 * Channel-level DingTalk configuration with pure accounts design.
 *
 * Example:
 * ```json
 * {
 *   "channels": {
 *     "dingtalk": {
 *       "enabled": true,
 *       "accounts": {
 *         "sales-bot": {
 *           "secretKey": "SEC...",
 *           "accessToken": "..."
 *         },
 *         "support-bot": {
 *           "secretKey": "SEC...",
 *           "accessToken": "..."
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 */
export interface DingTalkConfig {
  /** If false, disable all DingTalk accounts. Default: true. */
  enabled?: boolean;
  /** Map of accountId to account configuration. */
  accounts: Record<string, DingTalkAccountConfig>;
}

export interface ResolvedDingTalkAccount {
  accountId: string;
  name?: string;
  enabled: boolean;
  secretKey: string;
  webhookPath: string;
  accessToken: string;
  blockStreaming: boolean;
  toolProgress: 'off' | 'simple';
  toolProgressInGroup: 'off' | 'simple';
}

export interface DingTalkInboundMessage {
  msgtype: string;
  text?: { content: string };
  content?: {
    richText?: DingTalkRichTextNode[];
  };
  msgId: string;
  conversationType: string;
  conversationId: string;
  conversationTitle?: string;
  senderId: string;
  senderNick: string;
  senderPlatform?: string;
  chatbotUserId: string;
  openThreadId?: string;
  robotCode?: string;
  createAt: number;
  isAdmin: boolean;
  isInAtList: boolean;
  atUsers?: Array<{ dingtalkId: string }>;
  sessionWebhook: string;
  sessionWebhookExpiredTime: number;
}

export interface DingTalkRichTextNode {
  text?: string;
  type?: string;
  downloadCode?: string;
  pictureDownloadCode?: string;
  fileName?: string;
  contentType?: string;
  width?: number;
  height?: number;
}
