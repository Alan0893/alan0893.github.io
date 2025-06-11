/*-------------------------------------------------------*/
/* Home Page */
export const Home = `
	pt-10
	lg:w-1/2
`;

/*-------------------------------------------------------*/
/* For Pages */
export const PageContainer = `
	pt-10
`;

/*-------------------------------------------------------*/
/* Global Styles */
export const BackgroundContainer = `
	bg-slate-900 
	leading-relaxed 
	text-slate-400 
	antialiased 
	selection:bg-sky-300 
	selection:text-sky-900
`;
export const Mouse = `
	pointer-events-none 
	fixed 
	inset-0 
	z-30 
	lg:absolute
`;
export const ChildWrapper = `
	mx-auto 
	min-h-screen 
	max-w-screen-xl 
	px-6 py-12 
	font-sans 
	md:px-12 md:py-20 
	lg:px-24 lg:py-0
`;
export const ChildWrapper2 = `
	mx-auto 
	min-h-screen 
	max-w-screen-xl 
	font-sans 
	md:px-12 md:py-20 
	lg:px-24 lg:py-0
`;
export const BackgroundChild = `
	lg:flex
	lg:justify-between
	lg:gap-4
`;
export const GradientContainer = `
	isolate
`;
export const GradientWrapper1 = `
	fixed
	-top-40
	blur-2xl
`;
export const GradientWrapper2 = `
	fixed 
	inset-0
	blur-3xl
	pointer-events-none
`;
export const GradientSvg1 = `
	relative
	h-[24.1875rem]
	-translate-x-1/2
`;
export const GradientSvg2 = `
	h-full w-full
`;

/*-------------------------------------------------------*/
/* Header Styles */
export const HeaderContainer = `
	lg:sticky
	lg:top-0
	lg:flex
	lg:max-h-screen
	lg:w-1/2
	lg:flex-col
	lg:justify-between
	lg:py-24
`;
export const HeaderH1 = `
	text-4xl
	font-bold
	text-slate-200
	sm:text-5xl
`;
export const HeaderH2 = `
	mt-3
	text-lg
	font-medium
	text-slate-200
	sm:text-xl
`;
export const HeaderP = `
	mt-3
	max-w-xs
	leading-normal
`;

/*-------------------------------------------------------*/
/* Navigation Styles */
export const Nav = `
	lg:block
`;
export const NavItems = `
	mt-5
	w-max
`;
export const NavItem = `
	group
	flex
	items-center
	py-3
`;
export const NavSpan = `
	mr-4 
	h-px w-8 
	bg-slate-700 
	transition-all 
	group-hover:w-16 
	group-hover:bg-slate-200 
	group-focus-visible:w-16 
	group-focus-visible:bg-slate-200 
	motion-reduce:transition-none
`;
export const NavSpanText = `
	text-xs 
	font-bold 
	uppercase 
	tracking-widest 
	text-slate-500 
	group-hover:text-slate-200 
	group-focus-visible:text-slate-200
`;

/*-------------------------------------------------------*/
/* Media Styles */
export const MediaItems = `
	mt-8
	flex
	items-center
`;
export const Media = `
	mr-5 
	text-xs
	hover:text-slate-200
	block
`;
export const ActiveSpan = `
	mr-4 
	h-px w-16 
	bg-slate-200 
`;
export const ActiveSpanText = `
	text-xs 
	font-bold 
	uppercase 
	tracking-widest 
	text-slate-200 
`;

/*-------------------------------------------------------*/
/* Section Styles */
export const Section = `
	md:mb-24
	lg:mb-20
`;
export const SectionHeading = `
	sticky
	top-0
	z-20
	mb-4
	px-6 py-5
	backdrop-blur
	md:-mx-12
	md:px-12
`;
export const SectionH2 = `
	text-sm
	font-bold
	uppercase
	text-slate-200
`;
export const Links = `
	group/link
	text-slate-400
	hover:text-sky-300
	focus-visible:text-sky-300
`;
export const Svg = `
	mr-1
	mb-1
	inline-block 
	h-4 w-4
`;

/*-------------------------------------------------------*/
/* Component Styles */
export const Spacing = `
	mb-10
`;
export const Container = `
	group
	relative
	grid
	pb-1
	transition-all
	sm:grid-cols-8
	sm:gap-8
	md:gap-4
`;
export const DivStyles = `
	absolute
	-inset-x-4 -inset-y-4
	z-0
	hidden
	rounded-md
	lg:block
	lg:group-hover:bg-slate-800/50
`;
export const Subhead = `
	z-10 
	mb-2 
	mt-1 
	sm:ml-3 
	text-xs 
	font-semibold 
	uppercase 
	text-slate-500 
	sm:col-span-2
`;
export const Info = `
	z-10
	sm:col-span-6
`;
export const SectionH3 = `
	font-medium 
	leading-snug 
	text-slate-200
`;
export const H3Container = `
	group/link 
	inline-flex 
	font-medium 
	text-slate-200 
	hover:text-blue-400 
	focus-visible:text-blue-400
`;
export const H3Span = `
	absolute 
	-inset-x-4 -inset-y-2.5 
	hidden 
	md:-inset-x-6 md:-inset-y-4 
	lg:block
`;
export const LinkSvg = `
	ml-1 
	inline-block 
	h-4 w-4 
	shrink-0 
	translate-y-px 
	transition-transform 
	group-hover/link:-translate-y-1 
	group-hover/link:translate-x-1 
	group-focus-visible/link:-translate-y-1 
	group-focus-visible/link:translate-x-1 
	motion-reduce:transition-none
`;
export const InfoP = `
	mt-2 
	text-sm 
	leading-normal
`;
export const ChipWrapper = `
	mt-2
	flex
	flex-wrap
`;
export const Chip = `
	flex 
	items-center 
	rounded-full 
	bg-sky-400/10 
	px-3 py-1 
	text-xs 
	font-medium 
	leading-5
	text-sky-300
`;
export const ChipText = `
	ml-2
	mr-2
`;
export const ChipImage = `
	w-6 h-6
	lg:w-5 lg:h-5
	mt-1 mb-1
	lg:mt-0 lg:mb-0
`;
export const LinkWrapper = `
	group 
	inline-flex 
	items-center 
	font-medium 
	font-semibold 
	leading-tight 
	text-slate-200
`;
export const LinkText = `
	border-b 
	border-transparent 
	group-hover:border-sky-400 
`;
export const RightArrowSvg = `
	ml-1 
	inline-block 
	h-4 w-4 
	shrink-0 
	-translate-y-px 
	transition-transform 
	group-hover:translate-x-2 
	group-focus-visible:translate-x-2 
`;
export const LeftArrowSvg = `
	ml-1 
	inline-block 
	h-4 w-4 
	shrink-0 
	-translate-y-px 
	transition-transform 
	group-hover:-translate-x-2 
	group-focus-visible:-translate-x-2 
`;
export const Image = `
	rounded 
	border-2 
	border-slate-200/10 
	transition 
	group-hover:border-slate-200/30 
	sm:order-1 
	sm:col-span-2 
	sm:translate-y-1
	mt-4 
	md:mt-0 
	lg:mt-0
	md:mt-0 
	lg:mt-0
	mb-3
`;

/*-------------------------------------------------------*/
/* Project Containers */
export const ProjContainer  = `
	grid
	md:grid-cols-2
	gap-8
`;
export const ProjWrapper = `
	group
	relative
	grid
	pb-6
	gap-4
	p-5
	rounded-lg
`;
export const ProjDiv = `
	absolute 
	inset-0
	z-0 
	hidden 
	rounded-md 
	lg:block 
	lg:group-hover:bg-slate-800/50 
`;
export const Time = `
	z-10 
	mb-2 
	mt-1 
	sm:ml-3 
	text-xs 
	font-semibold 
	uppercase 
	text-slate-500 
	sm:col-span-2
`;
export const Footer = `
	max-w-md 
	pb-16 
	text-sm 
	text-slate-500 
	sm:pb-0
`;

/*-------------------------------------------------------*/
/* 404 Page */
export const Container404 = `
	w-full 
	h-screen 
	flex 
	justify-center 
	items-center
`;
export const Header404 = `
	text-4xl 
	font-semibold
`;
export const Separator = `
	border-t 
	h-2 w-8
	mx-auto
	my-2
`;
export const Text404 = `
	bg-blue-500 
	hover:bg-blue-700
	text-white 
	font-semibold 
	py-2 px-4 
	mt-4 
	rounded-xl
`;

/*-------------------------------------------------------*/
/* Contact Page */
export const ScrollWrapper = `
	relative 
	h-1 
	mt-1 
	overflow-hidden 
	rounded-3xl
`;
export const Scroll = `
	h-full 
	bg-blue-400
`;
export const FormMain = `
	pt-10 
	lg:w-1/2 
	mx-auto
`;
export const FormWrapper = `
	px-6 py-12
`;
export const FormStyle = `
	flex 
	flex-col 
	gap-6
`;
export const FormLabel = `
	block
`;
export const FormInput = `
	mt-1 
	block 
	w-full 
	px-3 
	py-2 
	bg-slate-800 
	border 
	border-slate-700 
	rounded-md 
	shadow-sm 
	focus:outline-none 
	focus:border-blue-500 
	focus:ring-blue-500 
	sm:text-sm
`;
export const FormButton = `
	bg-blue-500 
	hover:bg-blue-700 
	text-white 
	font-semibold 
	py-2 
	px-4 
	mt-4 
	rounded-xl
`;

/*-------------------------------------------------------*/
/* Experience Page */
export const SingleBlockContainer = `
	flex
	flex-col
`;
export const Timeline = `
	absolute 
	left-8 
	top-0 
	h-full 
	w-0.5 
	bg-slate-700/50
`;
export const TimelineDot = `
	absolute 
	left-8 
	top-6 
	-ml-1.5 
	h-3 w-3 
	rounded-full 
	ring-4 
	ring-slate-800
`;
export const TimelineDot2 = `
	inline-block 
	rounded-full 
	bg-slate-800/50 
	px-3 py-1 
	text-sm 
	text-slate-300
`;
export const Details = `
	relative 
	rounded-xl 
	border 
	border-slate-700/50 
	bg-slate-800/30 
	p-6 transition-all 
	hover:border-blue-500/30 
	hover:bg-slate-800/50
`;
export const List = `
	ml-4 mt-3 
	list-disc 
	space-y-2 
	text-sm 
	text-slate-400
`

/*-------------------------------------------------------*/
/* Assignment Page - CS 506 */
export const AssignmentCard = `
	border 
	border-slate-700 
	p-6 
	rounded-lg 
	shadow-lg 
	bg-slate-800 
	hover:bg-slate-700 
	transition-colors
`;
export const Video = `
	relative 
	pb-[56.25%] 
	h-0 
	overflow-hidden 
	rounded-lg
	mt-5
`;
export const Iframe = `
	absolute 
	top-0 left-0 
	w-full h-full
	rounded-lg
`;