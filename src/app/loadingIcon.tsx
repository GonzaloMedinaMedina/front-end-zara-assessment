export default function LoadingIcon({showIcon} : {showIcon:boolean})
{
    const display = showIcon ? 'block' : 'hidden'
    return <div className={display + " animate-border bg-blue-700 rounded-full w-10 h-10 border-1 border-blue-300 mb-5"}/>
}