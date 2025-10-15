import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    cats: collection({
      label: 'Cats',
      slugField: 'name',
      path: 'content/cats/*',
      format: { contentField: 'description' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        breed: fields.text({ label: 'Breed' }),
        color: fields.text({ label: 'Color' }),
        titles: fields.text({ label: 'Titles' }),
        description: fields.document({
          label: 'Description',
          formatting: true,
          links: true,
        }),
        images: fields.array(
          fields.object({
            image: fields.image({
              label: 'Image',
              directory: 'public/assets/cats',
              publicPath: '/assets/cats/',
            }),
            alt: fields.text({ label: 'Alt Text' }),
          }),
          {
            label: 'Images',
            itemLabel: (props) => props.fields.alt.value || 'Image',
          }
        ),
        featured: fields.checkbox({
          label: 'Featured',
          defaultValue: false,
        }),
        order: fields.integer({
          label: 'Display Order',
          defaultValue: 0,
        }),
      },
    }),
    kittens: collection({
      label: 'Kittens',
      slugField: 'name',
      path: 'content/kittens/*',
      format: { contentField: 'description' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
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
        gender: fields.select({
          label: 'Gender',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
          defaultValue: 'male',
        }),
        color: fields.text({ label: 'Color' }),
        price: fields.text({ label: 'Price' }),
        description: fields.document({
          label: 'Description',
          formatting: true,
        }),
        image: fields.image({
          label: 'Main Image',
          directory: 'public/assets/cats/Kittens',
          publicPath: '/assets/cats/Kittens/',
        }),
        gallery: fields.array(
          fields.image({
            label: 'Gallery Image',
            directory: 'public/assets/cats/Kittens',
            publicPath: '/assets/cats/Kittens/',
          }),
          {
            label: 'Image Gallery',
            itemLabel: (props) => props.value?.filename || 'Gallery Image',
          }
        ),
        parentFather: fields.text({ label: 'Father' }),
        parentMother: fields.text({ label: 'Mother' }),
        birthDate: fields.date({ label: 'Birth Date' }),
        availableFrom: fields.date({ label: 'Available From' }),
      },
    }),
    reviews: collection({
      label: 'Reviews',
      slugField: 'name',
      path: 'content/reviews/*',
      schema: {
        name: fields.slug({ name: { label: 'Reviewer Name' } }),
        rating: fields.integer({
          label: 'Rating',
          validation: { min: 1, max: 5 },
          defaultValue: 5,
        }),
        date: fields.text({ label: 'Date (e.g., "September 2024")' }),
        comment: fields.text({
          label: 'Review Text',
          multiline: true,
        }),
        platform: fields.select({
          label: 'Platform',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Google', value: 'google' },
            { label: 'Trustpilot', value: 'trustpilot' },
            { label: 'Direct', value: 'direct' },
          ],
          defaultValue: 'facebook',
        }),
        featured: fields.checkbox({
          label: 'Featured on Homepage',
          defaultValue: false,
        }),
      },
    }),
    faqs: collection({
      label: 'FAQs',
      slugField: 'question',
      path: 'content/faqs/*',
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer: fields.text({
          label: 'Answer',
          multiline: true,
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'General', value: 'general' },
            { label: 'Health', value: 'health' },
            { label: 'Adoption', value: 'adoption' },
            { label: 'Care', value: 'care' },
          ],
          defaultValue: 'general',
        }),
        order: fields.integer({
          label: 'Display Order',
          defaultValue: 0,
        }),
      },
    }),
  },
  singletons: {
    homepage: singleton({
      label: 'Homepage Content',
      path: 'content/homepage',
      schema: {
        heroTitle: fields.text({
          label: 'Hero Title',
          defaultValue: 'Welcome to Miausairovi Cattery',
        }),
        heroSubtitle: fields.text({
          label: 'Hero Subtitle',
          multiline: true,
        }),
        features: fields.array(
          fields.object({
            title: fields.text({ label: 'Feature Title' }),
            description: fields.text({
              label: 'Feature Description',
              multiline: true,
            }),
            icon: fields.select({
              label: 'Icon',
              options: [
                { label: 'Award', value: 'award' },
                { label: 'Stethoscope', value: 'stethoscope' },
                { label: 'Users', value: 'users' },
                { label: 'Heart', value: 'heart' },
                { label: 'Shield', value: 'shield' },
              ],
              defaultValue: 'award',
            }),
          }),
          {
            label: 'Features',
            itemLabel: (props) => props.fields.title.value || 'Feature',
          }
        ),
      },
    }),
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'content/settings',
      schema: {
        siteName: fields.text({
          label: 'Site Name',
          defaultValue: 'Miausairovi Cattery',
        }),
        siteDescription: fields.text({
          label: 'Site Description',
          multiline: true,
        }),
        contactEmail: fields.text({
          label: 'Contact Email',
          validation: { length: { min: 1 } },
        }),
        contactPhone: fields.text({ label: 'Contact Phone' }),
        address: fields.text({
          label: 'Address',
          multiline: true,
        }),
        socialMedia: fields.object({
          facebook: fields.url({ label: 'Facebook URL' }),
          instagram: fields.url({ label: 'Instagram URL' }),
          youtube: fields.url({ label: 'YouTube URL' }),
        }),
      },
    }),
  },
});
