export default function JobCompany({ itemData: company })
{
  return (
    <div className="company">
      <div className="company__comp">
        { company.name }
      </div>
    </div>
  )
}