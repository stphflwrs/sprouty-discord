interface ConfigProperties {
  activationCommand: 'sprout';
  activationSymbol: '.';
  botToken: string;
  categoryChannel: 'Sprouty';
  logChannel: string;
}

class Config {
  private static _instance: Config = new Config();
  private properties: ConfigProperties;

  private constructor() {
    this.properties = {
      activationCommand: 'sprout',
      activationSymbol: '.',
      botToken: process.env['BOT_TOKEN'],
      categoryChannel: 'Sprouty',
      logChannel: process.env['LOG_CHANNEL'] || 'sprouty-logs',
    };
  }

  public static get activationCommand(): string {
    return Config._instance.properties.activationCommand;
  }

  public static get activationSymbol(): string {
    return Config._instance.properties.activationSymbol;
  }

  public static get botToken(): string {
    return Config._instance.properties.botToken;
  }

  public static get categoryChannel(): string {
    return Config._instance.properties.categoryChannel;
  }

  public static get logChannel(): string {
    return Config._instance.properties.logChannel;
  }
}

export { Config, ConfigProperties };
