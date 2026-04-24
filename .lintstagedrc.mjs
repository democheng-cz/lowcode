function quoteFile(filePath) {
  return `"${filePath.replaceAll('\\', '/')}"`;
}

function joinFiles(filePaths) {
  return filePaths.map(quoteFile).join(' ');
}

export default {
  '*.{json,md,yml,yaml,css,less,scss,html}': (filePaths) => {
    const inputFiles = joinFiles(filePaths);

    return [`pnpm exec prettier --write ${inputFiles}`];
  },
  '*.{js,mjs,cjs}': (filePaths) => {
    const rootFiles = joinFiles(filePaths);

    return [
      `pnpm exec eslint --fix --max-warnings=0 ${rootFiles}`,
      `pnpm exec prettier --write ${rootFiles}`,
    ];
  },
  '.*.{js,mjs,cjs}': (filePaths) => {
    const rootDotFiles = joinFiles(filePaths);

    return [
      `pnpm exec eslint --fix --max-warnings=0 ${rootDotFiles}`,
      `pnpm exec prettier --write ${rootDotFiles}`,
    ];
  },
  'packages/front/src/**/*.{js,jsx,ts,tsx,mjs,cjs}': (filePaths) => {
    const frontFiles = joinFiles(filePaths);

    return [
      `pnpm exec eslint --config packages/front/eslint.config.mjs --fix --max-warnings=0 ${frontFiles}`,
      `pnpm exec prettier --write ${frontFiles}`,
    ];
  },
  'packages/serve/src/**/*.{js,ts,mjs,cjs}': (filePaths) => {
    const serveFiles = joinFiles(filePaths);

    return [
      `pnpm exec eslint --config packages/serve/eslint.config.mjs --fix --max-warnings=0 ${serveFiles}`,
      `pnpm exec prettier --write ${serveFiles}`,
    ];
  },
  '*.md': (filePaths) => {
    const markdownFiles = joinFiles(filePaths);

    return [
      `pnpm exec prettier --write ${markdownFiles}`,
      `pnpm exec cspell lint --no-must-find-files --no-progress ${markdownFiles}`,
    ];
  },
};
