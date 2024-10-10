import { KnownBlock, Block } from '@slack/types';
import { SummaryResults } from '.';

const generateBlocks = async (
  summaryResults: SummaryResults,
  maxNumberOfFailures: number,
): Promise<Array<KnownBlock | Block>> => {
  const meta = [];
  const header = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '🎭 *Playwright Results*',
    },
  };
  const summary = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `✅ *${summaryResults.passed}* | ❌ *${summaryResults.failed}* |${
        summaryResults.flaky !== undefined
          ? ` 🟡 *${summaryResults.flaky}* | `
          : ' '
      }⏩ *${summaryResults.skipped}*`,
    },
  };

  if (summaryResults.meta) {
    for (let i = 0; i < summaryResults.meta.length; i += 1) {
      const { key, value } = summaryResults.meta[i];
      meta.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `\n*${key}* :\t${value}`,
        },
      });
    }
  }

  return [header, summary, ...meta];
};

const generateFallbackText = (summaryResults: SummaryResults): string => `✅ ${summaryResults.passed} ❌ ${summaryResults.failed} ${
  summaryResults.flaky !== undefined ? ` 🟡 ${summaryResults.flaky} ` : ' '
}⏩ ${summaryResults.skipped}`;

export { generateBlocks, generateFallbackText };
