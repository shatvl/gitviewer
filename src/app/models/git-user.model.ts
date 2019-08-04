export interface GitUserShortInfo {
  avatar?: string;
  href?: string;
  username?: string;
}

export interface GitUser {
  id?: number;
  name?: string;
  login?: string;
  url?: string;
  avatar_url?: string;
  bio?: string;
  created_at?: string;
  followers?: number;
  following?: number;
}
