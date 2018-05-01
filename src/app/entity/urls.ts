/**
 * The class Urls store information about urls.
 */
export class Urls {
  /**
   * property - of authorization url
   */
  public static authUrl = 'http://localhost:8090/oauth/token';
  /**
   * property - of url with no privilege
   */
  public static newsUrl = 'http://localhost:8090/';
  /**
   * property - of url with user privilege
   */
  public static userUrl = 'http://localhost:8090/user';
  /**
   * property - of url with editor privilege
   */
  public static editorUrl = 'http://localhost:8090/editor';
  /**
   * property - of url with admin privilege
   */
  public static adminUrl = 'http://localhost:8090/admin';
}
