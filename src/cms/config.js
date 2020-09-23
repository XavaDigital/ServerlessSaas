export default {
  cms_manual_init: true,
  backend: {
    name: 'github',
    repo: 'jakeprins/serverless-saas',
    branch: 'master',
    squash_merges: true,
    base_url: 'https://us-central1-serverless-saas.cloudfunctions.net/',
    auth_endpoint: '/oauthAuthorize',
  },
  media_folder: 'public/img',
  public_folder: 'img',
  collections: [
    {
      name: 'pages',
      label: 'Pages',
      files: [
        {
          label: 'Home',
          name: 'home',
          file: 'content/pages/home.md',
          fields: [
            {
              label: 'Hero Title',
              name: 'hero_title',
              widget: 'string',
            },
            {
              label: 'Hero Description',
              name: 'hero_description',
              widget: 'markdown',
            },
            {
              label: 'Hero Image',
              name: 'hero_image',
              widget: 'image',
            },
            {
              label: 'Hero Button Label',
              name: 'hero_button_label',
              widget: 'string',
            },
            {
              label: 'Feature Title',
              name: 'feature_title',
              widget: 'string',
            },
            {
              label: 'Feature Description',
              name: 'feature_description',
              widget: 'string',
            },
            {
              label: 'Features',
              name: 'features',
              widget: 'list',
              fields: [
                {
                  label: 'Name',
                  name: 'name',
                  widget: 'string',
                },
                {
                  label: 'Description',
                  name: 'description',
                  widget: 'text',
                },
              ],
            },
            {
              label: 'Steps',
              name: 'steps',
              widget: 'list',
              fields: [
                {
                  label: 'Name',
                  name: 'name',
                  widget: 'string',
                },
                {
                  label: 'Description',
                  name: 'description',
                  widget: 'text',
                },
              ],
            },
            {
              label: 'Steps Image',
              name: 'steps_image',
              widget: 'image',
            },
            {
              label: 'Pricing Title',
              name: 'pricing_title',
              widget: 'string',
            },
            {
              label: 'Pricing Description',
              name: 'pricing_description',
              widget: 'string',
            },
            {
              label: 'Plans',
              name: 'plans',
              widget: 'list',
              fields: [
                {
                  label: 'Name',
                  name: 'name',
                  widget: 'string',
                },
                {
                  label: 'Description',
                  name: 'description',
                  widget: 'text',
                },
                {
                  label: 'Price',
                  name: 'price',
                  widget: 'string',
                },
                {
                  label: 'USPs',
                  name: 'usps',
                  widget: 'list',
                },
              ],
            },
            {
              label: 'Featured Posts',
              name: 'posts',
              widget: 'relation',
              collection: 'posts',
              searchFields: ['title'],
              valueField: '{{slug}}',
              displayFields: ['title'],
              multiple: true,
            },
            {
              label: 'Team Title',
              name: 'team_title',
              widget: 'string',
            },
            {
              label: 'Team Description',
              name: 'team_description',
              widget: 'markdown',
            },
            {
              label: 'Team',
              name: 'team',
              widget: 'list',
              fields: [
                {
                  label: 'Name',
                  name: 'name',
                  widget: 'string',
                },
                {
                  label: 'Description',
                  name: 'description',
                  widget: 'text',
                },
                {
                  label: 'Position',
                  name: 'position',
                  widget: 'string',
                },
                {
                  label: 'Image',
                  name: 'image',
                  widget: 'image',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'posts',
      label: 'Posts',
      folder: 'content/posts',
      create: true,
      slug: '{{slug}}',
      preview_path: 'posts/{{fields.slug}}',
      fields: [
        {
          label: 'Title',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'Slug',
          name: 'slug',
          widget: 'string',
        },
        {
          label: 'Draft',
          name: 'draft',
          widget: 'boolean',
          default: true,
        },
        {
          label: 'Publish Date',
          name: 'date',
          widget: 'datetime',
        },
        {
          label: 'Description',
          name: 'description',
          widget: 'text',
        },
        {
          label: 'Category',
          name: 'category',
          widget: 'string',
        },
        {
          label: 'Image',
          name: 'image',
          widget: 'image',
        },
        {
          label: 'Body',
          name: 'body',
          widget: 'markdown',
        },
        {
          label: 'Tags',
          name: 'tags',
          widget: 'list',
        },
      ],
    },
  ],
};