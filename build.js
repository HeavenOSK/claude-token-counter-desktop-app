// Inspired by https://zenn.dev/sprout2000/books/3691a679478de2/viewer/13600
//
import { build } from 'electron-builder';

build({
  config: {
    productName: 'Claude Token Counter',
    artifactName: '${productName}-${version}-${platform}-${arch}.${ext}',
    copyright: 'Copyright (c) 2024 HeavenOSK',
    files: ['main', 'renderer/out'],
    directories: {
      output: 'dist',
      buildResources: 'assets',
    },
    publish: {
      provider: 'github',
      releaseType: 'draft',
    },
    mac: {
      icon: 'assets/mac.icns',
      category: 'public.app-category.developer-tools',
      target: {
        target: 'dmg',
        arch: ['x64', 'arm64'],
      },
      identity: null,
    },
    win: {
      icon: 'assets/win32.ico',
      target: ['zip'],
    },
    linux: {
      icon: 'assets/linux.icns',
      target: ['AppImage'],
      category: 'Development',
    },
  },
});
