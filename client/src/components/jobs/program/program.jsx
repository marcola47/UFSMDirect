export default function JobProgram({ itemData: program })
{
  const progress = program.compatibility * 360;
  const style = { background: `conic-gradient(#135bec ${progress}deg, #99bbff 0deg)` }

  return (
    <div className="program">
      <div 
        className="program__progress" 
        style={ style } 
      />

      <div className="program__comp">
        <span>{ program.compatibility * 100 }%</span>
      </div>

      <div 
        className="program__name"
        children={ program.name }
      />
    </div>
  )
}