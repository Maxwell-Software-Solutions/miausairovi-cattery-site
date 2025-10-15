import { collection, config, fields, singleton } from '@keystatic/core';

type ImportMetaWithEnv = {
  env?: Record<string, string | undefined>;
};

const getEnvVar = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process?.env?.[key]) {
    return process.env[key];
  }

  const meta = typeof import.meta !== 'undefined' ? (import.meta as ImportMetaWithEnv).env : undefined;

  if (meta && typeof meta[key] === 'string') {
    return meta[key];
  }

  return undefined;
};

const getRepoFromEnv = (): `${string}/${string}` | null => {
  const explicitRepo = getEnvVar('KEYSTATIC_GITHUB_REPO');
  if (explicitRepo && explicitRepo.includes('/')) {
    return explicitRepo as `${string}/${string}`;
  }

  const owner = getEnvVar('KEYSTATIC_GITHUB_REPO_OWNER');
  const name = getEnvVar('KEYSTATIC_GITHUB_REPO_NAME');

  if (owner && name) {
    return `${owner}/${name}`;
  }

  return 'Maxwell-Software-Solutions/miausairovi-cattery-site';
};

const repoFromEnv = getRepoFromEnv();

const shouldUseLocalStorage = getEnvVar('KEYSTATIC_STORAGE') === 'local' || !repoFromEnv;

const keystaticConfig = config({
  storage: shouldUseLocalStorage
    ? { kind: 'local' as const }
    : {
        kind: 'github' as const,
        repo: repoFromEnv,
        pathPrefix: 'content',
        branchPrefix: getEnvVar('KEYSTATIC_GITHUB_BRANCH_PREFIX') || undefined,
      },
  ui: {
    brand: {
      name: 'Miausairovi CMS',
    },
    navigation: {
      Content: ['cats', 'kittens', 'reviews', 'faqs'],
      Settings: ['homepage', 'settings'],
    },
  },
  singletons: {
    homepage: singleton({
      label: 'Homepage',
      path: 'homepage',
      schema: {
        heroTitle: fields.text({
          label: 'Hero Title',
          validation: { isRequired: true },
        }),
        heroSubtitle: fields.text({
          label: 'Hero Subtitle',
          multiline: true,
          validation: { isRequired: true },
        }),
        features: fields.array(
          fields.object(
            {
              title: fields.text({
                label: 'Title',
                validation: { isRequired: true },
              }),
              description: fields.text({
                label: 'Description',
                multiline: true,
                validation: { isRequired: true },
              }),
              icon: fields.text({
                label: 'Icon',
                validation: { isRequired: true },
              }),
            },
            { label: 'Feature' }
          ),
          { label: 'Features' }
        ),
      },
    }),
    settings: singleton({
      label: 'Site Settings',
      path: 'settings',
      schema: {
        siteName: fields.text({
          label: 'Site Name',
          validation: { isRequired: true },
        }),
        siteDescription: fields.text({
          label: 'Site Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        contactEmail: fields.text({
          label: 'Contact Email',
          validation: { isRequired: true },
        }),
        contactPhone: fields.text({ label: 'Contact Phone' }),
        address: fields.text({
          label: 'Address',
          multiline: true,
        }),
        socialMedia: fields.object(
          {
            facebook: fields.text({ label: 'Facebook URL' }),
            instagram: fields.text({ label: 'Instagram URL' }),
            youtube: fields.text({ label: 'YouTube URL' }),
          },
          {
            label: 'Social Media',
            layout: [4, 4, 4],
          }
        ),
      },
    }),
  },
  collections: {
    cats: collection({
      label: 'Cats',
      path: 'cats/*',
      slugField: 'name',
      format: {
        data: 'yaml',
        contentField: 'description',
      },
      schema: {
        name: fields.text({
          label: 'Name',
          validation: { isRequired: true },
        }),
        breed: fields.text({
          label: 'Breed',
          validation: { isRequired: true },
        }),
        color: fields.text({
          label: 'Color',
          validation: { isRequired: true },
        }),
        titles: fields.text({ label: 'Titles' }),
        images: fields.array(
          fields.object(
            {
              image: fields.text({
                label: 'Image Path',
                validation: { isRequired: true },
              }),
              alt: fields.text({
                label: 'Alt Text',
                validation: { isRequired: true },
              }),
            },
            { label: 'Image' }
          ),
          { label: 'Gallery Images' }
        ),
        featured: fields.checkbox({ label: 'Featured' }),
        order: fields.integer({
          label: 'Display Order',
          defaultValue: 0,
        }),
        description: fields.document({
          label: 'Description',
          formatting: true,
          dividers: true,
          links: true,
        }),
      },
    }),
    kittens: collection({
      label: 'Kittens',
      path: 'kittens/*',
      slugField: 'name',
      format: {
        data: 'yaml',
        contentField: 'description',
      },
      schema: {
        name: fields.text({
          label: 'Name',
          validation: { isRequired: true },
        }),
        age: fields.text({ label: 'Age' }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Available', value: 'available' },
            { label: 'Reserved', value: 'reserved' },
            { label: 'Sold', value: 'sold' },
          ],
          defaultValue: 'available',
        }),
        price: fields.text({ label: 'Price' }),
        image: fields.text({
          label: 'Primary Image',
          validation: { isRequired: true },
        }),
        description: fields.document({
          label: 'Description',
          formatting: true,
          links: true,
        }),
        order: fields.integer({
          label: 'Display Order',
          defaultValue: 0,
        }),
      },
    }),
    reviews: collection({
      label: 'Reviews',
      path: 'reviews/*',
      slugField: 'name',
      format: {
        data: 'yaml',
        contentField: 'text',
      },
      schema: {
        name: fields.text({
          label: 'Reviewer Name',
          validation: { isRequired: true },
        }),
        rating: fields.integer({
          label: 'Rating',
          defaultValue: 5,
          validation: { min: 1, max: 5 },
        }),
        date: fields.text({ label: 'Date' }),
        platform: fields.select({
          label: 'Platform',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Google', value: 'google' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Testimonial', value: 'testimonial' },
          ],
          defaultValue: 'facebook',
        }),
        featured: fields.checkbox({ label: 'Featured' }),
        text: fields.document({
          label: 'Review Text',
          formatting: true,
          links: true,
        }),
      },
    }),
    faqs: collection({
      label: 'FAQs',
      path: 'faqs/*',
      slugField: 'question',
      format: {
        data: 'yaml',
        contentField: 'answer',
      },
      schema: {
        question: fields.text({
          label: 'Question',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Adoption', value: 'adoption' },
            { label: 'Care', value: 'care' },
            { label: 'General', value: 'general' },
            { label: 'Health', value: 'health' },
          ],
          defaultValue: 'general',
        }),
        order: fields.integer({
          label: 'Display Order',
          defaultValue: 0,
        }),
        answer: fields.document({
          label: 'Answer',
          formatting: true,
          links: true,
        }),
      },
    }),
  },
});

export default keystaticConfig;
