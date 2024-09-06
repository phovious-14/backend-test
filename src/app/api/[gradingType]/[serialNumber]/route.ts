import { beckett } from "@/lib/beckett"
import { CGC } from "@/lib/cgc"
import { psa } from "@/lib/psa"

export async function GET(request: Request, { params }: { params: { gradingType: string , serialNumber: string } }) {

    //get two params from url /api/[gradingType]/[serialNumber]

    const { gradingType, serialNumber } = params

    //check gradingType and call particular function that return scrapped data

    if(gradingType === 'BGS') {
      const data = await beckett(serialNumber, gradingType)
      return Response.json(data)
    }

    if(gradingType === 'CGC') {
      const data = await CGC(serialNumber)
      console.log(data);
      
      return Response.json(data)
    }

    if(gradingType === 'PSA') {
      const data = await psa(serialNumber)

      return Response.json(data)      
    }
 
  return Response.json("No grader found") 
}

