import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      sidebar: [
        {
          label: "入門",
          autogenerate: {directory: "."}
        },
        {
          label: "マニュアル",
          items: [
            {label: "RT", autogenerate: {directory: "manual/rt"}},
            {label: "個人", autogenerate: {directory: "manual/individual"}},
            {label: "サーバー運用", items: [
              {label: "ロールキーパー", link: "manual/server_management/role_keeper.md"},
              {label: "ガイド", autogenerate: {directory: "manual/server_management/guide"}}
            ]},
            {label: "サーバーツール", autogenerate: {directory: "manual/server_tool"}}
          ]
        },
        {
          label: "リファレンス",
          autogenerate: {directory: "reference"},
        },
        {
          label: "開発者向け",
          autogenerate: {directory: "developer"}
        }
      ],
    }),
  ],
});
