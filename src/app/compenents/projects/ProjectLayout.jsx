import React from 'react'

const ProjectLayout = ({name, description, date, demoLink}) => {
return (
<div className='flex items-center justify-between w-full relative rounded-1g overflow-hidden p-6 custom-bg'>

<div className='flex items-center justify-center space-x-2'>
<h1 className='text-foreground text-lg font-bold font-sans text-green-600'>{name}</h1>
<p className='text-foreground text-sm font-bold font-sans' style={{ color: 'aqua' }}>{description}</p>
</div>
<div className='self-end flex-1 mx-2 mb-1 bg-transparent border-b border-dashed border-muted' />
<p className='text-foreground'>
 {new Date(date). toDateString()}
</p></div>

)
}
export default ProjectLayout