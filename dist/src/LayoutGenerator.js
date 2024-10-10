"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFallbackText = exports.generateBlocks = void 0;
const generateBlocks = async (summaryResults, maxNumberOfFailures) => {
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
            text: `✅ *${summaryResults.passed}* | ❌ *${summaryResults.failed}* |${summaryResults.flaky !== undefined
                ? ` 🟡 *${summaryResults.flaky}* | `
                : ' '}⏩ *${summaryResults.skipped}*`,
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
exports.generateBlocks = generateBlocks;
const generateFallbackText = (summaryResults) => `✅ ${summaryResults.passed} ❌ ${summaryResults.failed} ${summaryResults.flaky !== undefined ? ` 🟡 ${summaryResults.flaky} ` : ' '}⏩ ${summaryResults.skipped}`;
exports.generateFallbackText = generateFallbackText;
//# sourceMappingURL=LayoutGenerator.js.map