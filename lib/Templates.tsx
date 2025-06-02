import {
  FaceSmileIcon,
  PencilIcon,
  DocumentTextIcon,
  LightBulbIcon,
  VideoCameraIcon,
  SparklesIcon,
  HashtagIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  CameraIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  QuestionMarkCircleIcon,
  BugAntIcon,
  MegaphoneIcon,
  ShoppingBagIcon,
  PlayIcon,
  SpeakerWaveIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

export const templates= [
  {
    name: 'Blog Title Generator',
    desc: 'Generate 5 catchy blog titles based on your blog niche and outline.',
    category: 'Blog',
    icon: PencilIcon,
    slug: 'generate-blog-title',
    aiPrompt:
      'Generate 5 unique blog titles in bullet points based on the given niche and outline. Return output in rich text editor format.',
    form: [
      { label: 'Enter your blog niche', field: 'input', name: 'niche', required: true },
      { label: 'Enter blog outline', field: 'textarea', name: 'outline' },
    ],
  },
  {
    name: 'Blog Content Generator',
    desc: 'Generate full blog content based on topic and outline using AI.',
    category: 'Blog',
    icon: DocumentTextIcon,
    slug: 'blog-content-generation',
    aiPrompt:
      'Generate full blog content based on the provided topic and outline. Return output in rich text editor format.',
    form: [
      { label: 'Enter your blog topic', field: 'input', name: 'topic', required: true },
      { label: 'Enter blog outline', field: 'textarea', name: 'outline' },
    ],
  },
  {
    name: 'Blog Topic Ideas',
    desc: 'Get 5 topic ideas based on your blog niche.',
    category: 'Blog',
    icon: LightBulbIcon,
    slug: 'blog-topic-idea',
    aiPrompt:
      'Generate 5 unique blog topic ideas in bullet points based on the given niche. Return output in rich text editor format.',
    form: [{ label: 'Enter your blog niche', field: 'input', name: 'niche', required: true }],
  },
  {
    name: 'YouTube SEO Title Generator',
    desc: 'Get 5 SEO-optimized YouTube titles based on keywords and video outline.',
    category: 'YouTube Tools',
    icon: VideoCameraIcon,
    slug: 'youtube-seo-title',
    aiPrompt:
      'Generate 5 high-ranking SEO YouTube titles in bullet points based on given keywords and outline. Return result in HTML tags format.',
    form: [
      { label: 'Enter your video keywords', field: 'input', name: 'keywords', required: true },
      { label: 'Enter video outline', field: 'textarea', name: 'outline' },
    ],
  },
  {
    name: 'YouTube Description Generator',
    desc: 'Create engaging YouTube descriptions with emojis and proper formatting.',
    category: 'YouTube Tools',
    icon: SparklesIcon,
    slug: 'youtube-description',
    aiPrompt:
      'Generate a 4–5 line YouTube video description with emojis based on the topic and outline. Return output in rich text editor format.',
    form: [
      { label: 'Enter your video title', field: 'input', name: 'topic', required: true },
      { label: 'Enter video outline', field: 'textarea', name: 'outline' },
    ],
  },
  {
    name: 'YouTube Tag Generator',
    desc: 'Generate 10 keyword-rich YouTube tags based on your video content.',
    category: 'YouTube Tools',
    icon: HashtagIcon,
    slug: 'youtube-tag',
    aiPrompt:
      'Generate 10 YouTube tags in bullet points based on the given title and outline. Return output in rich text editor format.',
    form: [
      { label: 'Enter your video title', field: 'input', name: 'title', required: true },
      { label: 'Enter video outline (optional)', field: 'textarea', name: 'outline' },
    ],
  },
  {
    name: 'Article Rewriter (Plagiarism-Free)',
    desc: 'Rewrite any blog or article content to make it unique and plagiarism-free.',
    category: 'Rewriting Tool',
    icon: ArrowPathIcon,
    slug: 'rewrite-article',
    aiPrompt:
      'Rewrite the provided article or blog content to make it plagiarism-free. Return output in rich text editor format.',
    form: [{ label: 'Paste the article to rewrite', field: 'textarea', name: 'article', required: true }],
  },
  {
    name: 'Text Improver',
    desc: 'Enhance your writing by fixing grammar and improving clarity and tone.',
    category: 'Writing Assistant',
    icon: PencilSquareIcon,
    slug: 'text-improver',
    aiPrompt:
      'Improve the provided text by correcting grammar and rewriting it professionally. Return output in rich text editor format.',
    form: [{ label: 'Enter text to improve', field: 'textarea', name: 'textToImprove', required: true }],
  },
  {
    name: 'Add Emojis to Text',
    desc: 'Automatically add relevant emojis to your text to make it more expressive.',
    category: 'Blog',
    icon: FaceSmileIcon, // No heroicon for this, consider adding a local emoji image or custom SVG
    slug: 'add-emoji-to-text',
    aiPrompt:
      'Enhance the provided text by adding relevant emojis. Return result in rich text editor format.',
    form: [{ label: 'Enter text to enhance with emojis', field: 'textarea', name: 'outline', required: true }],
  },
  {
    name: 'Instagram Post Generator',
    desc: 'Generate engaging Instagram post content based on your keywords.',
    category: 'Social Media',
    icon: CameraIcon,
    slug: 'instagram-post-generator',
    aiPrompt:
      'Generate 3 creative Instagram post ideas based on the given keywords. Return output in rich text editor format.',
    form: [{ label: 'Enter keywords for your post', field: 'input', name: 'keywords', required: true }],
  },
  {
    name: 'Instagram Hashtag Generator',
    desc: 'Get 15 top-performing hashtags for Instagram based on your keywords.',
    category: 'Social Media',
    icon: HashtagIcon,
    slug: 'instagram-hash-tag-generator',
    aiPrompt:
      'Generate 15 trending and relevant Instagram hashtags based on the given keywords. Return output in rich text editor format.',
    form: [{ label: 'Enter keywords for hashtags', field: 'input', name: 'keywords', required: true }],
  },
  {
    name: 'Instagram Post/Reel Ideas',
    desc: 'Get fresh and trending Instagram post or reel ideas based on your niche.',
    category: 'Social Media',
    icon: LightBulbIcon,
    slug: 'instagram-post-idea-generator',
    aiPrompt:
      'Generate 5–10 Instagram post or reel ideas based on the given niche. Include latest trends. Return output in rich text editor format.',
    form: [{ label: 'Enter niche or keywords for ideas', field: 'input', name: 'keywords', required: true }],
  },
  {
    name: 'English Grammar Checker',
    desc: 'Correct grammatical errors and improve sentence structure in your text.',
    category: 'Writing Assistant',
    icon: CheckCircleIcon,
    slug: 'english-grammer-checker',
    aiPrompt:
      'Correct grammatical errors and improve the input text. Return output in rich text editor format.',
    form: [{ label: 'Enter text to check grammar', field: 'input', name: 'inputText', required: true }],
  },
  {
    name: 'Code Generator',
    desc: 'Generate programming code in any language based on your description.',
    category: 'Coding',
    icon: CodeBracketIcon,
    slug: 'write-code',
    aiPrompt:
      'Based on the provided description, generate code in the specified programming language. Return result in rich text editor format using code blocks.',
    form: [{ label: 'Enter code description and language', field: 'textarea', name: 'codeDescription', required: true }],
  },
  {
    name: 'Code Explainer',
    desc: 'Understand any code snippet with a clear, line-by-line explanation.',
    category: 'Coding',
    icon: QuestionMarkCircleIcon,
    slug: 'explain-code',
    aiPrompt:
      'Explain the given code snippet line by line. Return result in rich text editor format using code blocks.',
    form: [{ label: 'Enter code to explain', field: 'textarea', name: 'codeDescription', required: true }],
  },
  {
    name: 'Code Bug Detector',
    desc: 'Analyze code for bugs and return possible fixes and solutions.',
    category: 'Coding',
    icon: BugAntIcon,
    slug: 'code-bug-detector',
    aiPrompt:
      'Find bugs in the provided code and suggest fixes. Return output in rich text editor format using code blocks.',
    form: [{ label: 'Enter code to debug', field: 'textarea', name: 'codeInput', required: true }],
  },
  {
    name: 'Tagline Generator',
    desc: 'Create catchy and creative brand or product taglines.',
    category: 'Marketing',
    icon: MegaphoneIcon,
    slug: 'tagline-generator',
    aiPrompt:
      'Based on the product name and outline, generate 5–10 creative and catchy taglines. Return output in rich text editor format.',
    form: [
      { label: 'Product or brand name', field: 'input', name: 'productName', required: true },
      { label: 'Describe your product or marketing goal', field: 'textarea', name: 'outline', required: true },
    ],
  },
  {
    name: 'Product Description Generator',
    desc: 'Generate SEO-friendly product descriptions for e-commerce stores.',
    category: 'Marketing',
    icon: ShoppingBagIcon,
    slug: 'product-description',
    aiPrompt:
      'Based on the product name and details, generate a short, SEO-optimized description. Return output in rich text editor format.',
    form: [
      { label: 'Product name', field: 'input', name: 'productName', required: true },
      { label: 'Product details', field: 'textarea', name: 'outline', required: true },
    ],
  },
  {
    name: 'Video Script Generator',
    desc: 'Generate engaging video scripts based on topic and target audience.',
    category: 'Video Content',
    icon: PlayIcon,
    slug: 'video-script-generator',
    aiPrompt:
      'Create a detailed video script for the given topic and target audience. Return output in rich text editor format.',
    form: [
      { label: 'Enter video topic', field: 'input', name: 'topic', required: true },
      { label: 'Target audience or style', field: 'textarea', name: 'style' },
    ],
  },
  {
    name: 'Social Media Ad Copy Generator',
    desc: 'Generate catchy and converting ad copies for social media platforms.',
    category: 'Marketing',
    icon: SpeakerWaveIcon,
    slug: 'social-ad-copy-generator',
    aiPrompt:
      'Write 3 different social media ad copies based on the product/service and target audience. Return output in rich text editor format.',
    form: [
      { label: 'Product or service name', field: 'input', name: 'productName', required: true },
      { label: 'Target audience or description', field: 'textarea', name: 'description', required: true },
    ],
  },
  {
    name: 'Email Newsletter Generator',
    desc: 'Create engaging email newsletter content based on topic and goals.',
    category: 'Email Marketing',
    icon: EnvelopeIcon,
    slug: 'email-newsletter-generator',
    aiPrompt:
      'Generate a full email newsletter based on the given topic and goals. Return output in rich text editor format.',
    form: [
      { label: 'Newsletter topic', field: 'input', name: 'topic', required: true },
      { label: 'Main points or goals', field: 'textarea', name: 'outline' },
    ],
  },
  {
    name: 'FAQ Generator',
    desc: 'Generate frequently asked questions with answers based on product or topic.',
    category: 'Customer Support',
    icon: QuestionMarkCircleIcon,
    slug: 'faq-generator',
    aiPrompt:
      'Generate 5-10 frequently asked questions with detailed answers based on the provided topic or product. Return output in rich text editor format.',
    form: [{ label: 'Enter topic or product', field: 'input', name: 'topic', required: true }],
  },
];
