interface CreatedAt {
  type: string;
  expires: string;
  default: string;
}

export interface IdToken {
  iss: string;
  user: string;
  issuer_code?: string;
  roles?: string[];
  user_info?: {
    given_name: string;
    family_name: string;
    name: string;
    email: string;
  };
  platformInfo?: {
    family_code: string;
    version: string;
    name: string;
    description: string;
  };
  endpoint?: {
    scope: string[];
    line_items: string;
    line_item: string;
  };
  names_roles?: {
    context_membershipts_url: string;
    service_versions: string[];
  };
  created_at?: CreatedAt;
}

export interface ContextToken {
  path: string;
  user: string;
  context?: {
    id: string;
    label: string;
    title: string;
    type: [];
  };
  resource?: {
    title: string;
    id: string;
  };
  custom?: string;
  created_at?: CreatedAt;
}

export interface Platform {
  platformUrl: string;
  platformName?: string;
  clientId?: string;
  authEndpoint?: string;
  accessTokenEndpoint?: string;
  kid: string;
  auth_config?: {
    method: string;
    key: string;
  };
}

export interface Key {
  kid: string;
  iv?: string;
  data?: string;
}

export interface AccessToken {
  platform_url: string;
  iv?: string;
  data?: string;
  created_at?: CreatedAt;
}

export interface Nonce {
  nonce: string;
  created_at?: CreatedAt;
}
