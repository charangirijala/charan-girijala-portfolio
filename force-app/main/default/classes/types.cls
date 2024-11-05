public class types {
  public class GitHubUser {
    @AuraEnabled
    public String name;
    @AuraEnabled
    public String GitHubUsername;
    @AuraEnabled
    public String avatarUrl;
    @AuraEnabled
    public ContributionsCollection contributionsCollection;
  }

  public class ContributionsCollection {
    @AuraEnabled
    public List<Integer> years;
    @AuraEnabled
    public ContributionCalendar contributionCalendar;
    public ContributionsCollection() {
    }
  }

  public class GitHubApiJson {
    @AuraEnabled
    public ContributionBasic data;
    @AuraEnabled
    public String message;
    @AuraEnabled
    public List<Error> errors;

    public GitHubApiJson() {
    }
  }

  public class Error {
    @AuraEnabled
    public String type;
    @AuraEnabled
    public String message;
    public Error() {
    }
  }

  public class ContributionBasic {
    @AuraEnabled
    public User user;
    public ContributionBasic() {
    }
  }

  public class User {
    @AuraEnabled
    public ContributionsCollection contributionsCollection;
    @AuraEnabled
    public String name;
    @AuraEnabled
    public String login;
    @AuraEnabled
    public String avatarUrl;
    public User() {
    }
  }

  public class ContributionCalendar {
    @AuraEnabled
    public Integer total;
    @AuraEnabled
    public List<ContributionDays> weeks;
    public ContributionCalendar() {
    }
  }

  public class ContributionDays {
    @AuraEnabled
    public List<ContributionDay> days;
    public ContributionDays() {
    }
  }

  public class ContributionDay {
    @AuraEnabled
    public Integer count;
    @AuraEnabled
    public String datex;
    @AuraEnabled
    public String level;
    @AuraEnabled
    public Integer weekday;
    public ContributionDay() {
    }
  }
}
