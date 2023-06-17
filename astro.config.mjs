import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'RT Docs',
      social: {
        discord: "https://discord.gg/aP7SG5XaTK",
        github: 'https://github.com/rext-dev/rt-docs'
      },
      defaultLocale: 'ja',
      locales: {
        ja: {
          label: "日本語",
          lang: "ja"
        },
        en: {
          label: 'English',
          lang: "en"
        }
      },
      sidebar: [
        {
          label: "入門",
          translations: {en: "Getting Started"},
          items: [
            {label: "イントロダクション", translations: {en: "Introduction"}, link: "/"},
            {label: "導入方法", translations: {en: "Installation"}, link: "install"},
            {label: "トラブルシューティング", translations: {en: "Trouble Shooting"}, link: "trouble_shooting"},
          ]
        },
        {
          label: "マニュアル",
          translations: {en: "Manual"},
          items: [
            {label: "予備知識", translations: {en: "Background Knowledge"}, link: "manual"},
            {label: "RT", autogenerate: {directory: "manual/rt"}},
            {
              label: "個人", translations: {en: "Individual"},
              autogenerate: {directory: "manual/individual"}
            },
            {label: "サーバー運用", translations: {en: "Server Management"}, items: [
              {label: "ロールキーパー", link: "manual/server_management/role_keeper.md"},
              {label: "ガイド", autogenerate: {directory: "manual/server_management/guide"}}
            ]},
            {
              label: "サーバーツール", translations: {en: "Server Tool"},
              autogenerate: {directory: "manual/server_tool"}
            }
          ]
        },
        {
          label: "リファレンス",
          translations: {en: "Reference"},
          autogenerate: {directory: "reference"},
        },
        {
          label: "開発者向け",
          translations: {en: "Developer"},
          autogenerate: {directory: "developer"}
        }
      ],
    }),
  ],
});
