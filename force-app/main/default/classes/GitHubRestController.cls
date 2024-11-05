public with sharing class GitHubRestController {
  @AuraEnabled(cacheable=true)
  public static types.GitHubApiJson getGithubUser(String username) {
    types.GitHubApiJson result = new types.GitHubApiJson();
    HttpRequest req = new HttpRequest();
    req.setEndpoint('callout:GitHub_OAuth' + '/graphql');
    req.setMethod('POST');
    Map<String, String> queryMap = new Map<String, String>();
    String QUERY =
      'query { user(login:"' +
      username +
      '") { name login avatarUrl contributionsCollection {years: contributionYears}}}';
    queryMap.put('query', QUERY);
    String jsonBody = JSON.serialize(queryMap);
    req.setBody(jsonBody);

    req.setHeader('Accept', 'application/json');
    req.setHeader('Content-Type', 'application/json');
    Http http = new Http();

    HttpResponse res = http.send(req);
    if (res.getStatusCode() != 200) {
      String err =
        'Error Fetching Data from GitHub StatusCode: ' +
        res.getStatusCode().toString() +
        ' Status: ' +
        res.getStatus();
      System.debug(err);
      types.Error error = new types.Error();
      error.message = err;
      error.type = res.getStatus();
      result.errors.add(error);
    } else {
      String resBody = res.getBody();
      System.debug('JSON response: ' + resBody);
      result = (types.GitHubApiJson) System.JSON.deserialize(
        resBody,
        types.GitHubApiJson.class
      );
      System.debug('Converted Object: ' + result);
    }

    return result;
  }

  @AuraEnabled(cacheable=true)
  public static types.GitHubApiJson getContributions(
    String username,
    Integer year
  ) {
    types.GitHubApiJson result = new types.GitHubApiJson();
    HttpRequest req = new HttpRequest();
    req.setEndpoint('callout:GitHub_OAuth' + '/graphql');
    req.setMethod('POST');
    Map<String, String> queryMap = new Map<String, String>();
    String QUERY =
      'query { user(login: "' +
      username +
      '") { contributionsCollection(from: "' +
      year +
      '-01-01T00:00:00Z", to: "' +
      year +
      '-12-31T00:00:00Z") { contributionCalendar { total: totalContributions weeks { days: contributionDays { count: contributionCount level: contributionLevel date weekday } } } } } }';
    queryMap.put('query', QUERY);
    String jsonBody = JSON.serialize(queryMap);
    req.setBody(jsonBody);

    req.setHeader('Accept', 'application/json');
    req.setHeader('Content-Type', 'application/json');
    Http http = new Http();

    HttpResponse res = http.send(req);
    // System.debug(res.getBody());
    if (res.getStatusCode() != 200) {
      String err =
        'Error Fetching Data from GitHub StatusCode: ' +
        res.getStatusCode().toString() +
        ' Status: ' +
        res.getStatus();
      System.debug(err);
      types.Error error = new types.Error();
      error.message = err;
      error.type = res.getStatus();
      result.errors.add(error);
    } else {
      String json = res.getBody();
      String resBody = json.replaceAll('date', 'datex');
      System.debug('JSON response: ' + resBody);
      result = (types.GitHubApiJson) System.JSON.deserialize(
        resBody,
        types.GitHubApiJson.class
      );

      System.debug('Converted Object: ' + result);
    }
    return result;
  }
}
