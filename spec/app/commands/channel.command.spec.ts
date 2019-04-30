import { expect } from 'chai';
import { ChannelCommand } from '../../../src/app/commands/channel.command';
import { SinonStubbedInstance, createSandbox } from 'sinon';
import { Client, Guild, TextChannel } from 'discord.js';
import { ChannelCommandParsed } from '../../../src/app/parsers/channel-command.parser';

const sandbox = createSandbox();
describe('ChannelCommand', function() {
  let subject: ChannelCommand;

  describe('Unit Tests', function() {
    beforeEach(function() {
      const client: SinonStubbedInstance<Client> = sandbox.createStubInstance(Client);

      subject = new ChannelCommand(client as unknown as Client);
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('is created', function() {
      expect(subject).to.exist;
    });

    describe('#respond', function() {
      let guild: SinonStubbedInstance<Guild>;
      let sourceChannel: SinonStubbedInstance<TextChannel>;

      let channelCommandParsed: ChannelCommandParsed;

      beforeEach(function() {
        guild = sandbox.createStubInstance(Guild);
        const textChannel: SinonStubbedInstance<TextChannel> = sandbox.createStubInstance(TextChannel);
        textChannel.setParent.resolves();
        guild.createChannel.resolves(textChannel as any);

        sourceChannel = sandbox.createStubInstance(TextChannel);
        sourceChannel.send.resolves();

        channelCommandParsed = {
          _argv: [],
          guild: guild as any,
          sourceChannel: sourceChannel as any,
          channelName: null,
        };
      });

      describe('with channel name "sprouty-test"', function() {
        beforeEach(function() {
          channelCommandParsed.channelName = 'sprouty-test';
        });

        it('')
      });
    });
  });
});
