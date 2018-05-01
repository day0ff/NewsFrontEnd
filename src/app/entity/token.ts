/**
 * The class entity store information about Token.
 */
export class Token {
  /**
   * property - of Token Access
   */
  access_token: string;
  /**
   * property - of Token Type
   */
  token_type: string;
  /**
   * property - of Token Expiry Time
   */
  expires_in: number;
  /**
   * property - of Token Scope
   */
  scope: string[];
  /**
   * Creates a new default object Token
   * @constructor
   */
  constructor(access_token: string, token_type: string, expires_in: number, scope: string[]) {
    this.access_token = access_token;
    this.token_type = token_type;
    this.expires_in = expires_in;
    this.scope = scope;
  }
}
