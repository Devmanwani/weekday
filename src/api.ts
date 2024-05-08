export interface Job{
    jdUid: string;
    jdLink: string;
    jobDetailsFromCompany: string;
    maxJdSalary: number;
    minJdSalary: number;
    SalaryCurrencyCode:string;
    location: string;
    minExp:number;
    maxExp:number;
    jobRole: string;
    companyName: string;
    logoUrl:string;
}

export const fetchJobsAPI = async (offset:number): Promise<Job[]> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
        limit: 10, 
        offset
    });

    try{
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
            method: 'POST',
            headers: myHeaders,
            body
        });

        if(!response.ok){
            throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        return data.jdList;

    }catch(err:any){
        throw new Error(err.message);
    }
};