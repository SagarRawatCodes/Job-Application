import supabaseClient from "@/utils/superbase";

export async function getJobs(token,{location,company_id,searchQuery}){
    const  supabase = await supabaseClient(token);

    let query = supabase.from("jobs").select("*,company:companies(name,logo_url),saved:saved_jobs(id)");
    if(location){
        query=query.eq("location",location);

    }
    if(company_id){
        query=query.eq("company_id",company_id);
    }
    if(searchQuery){
        query=query.ilike("title",`%${searchQuery}%`);
    }


    const {data,error} = await query

    if(error){
        console.log("Error fetching Jobs:",error);
        return null;
    }
    return data;

}
export async function getSavedJobs(token) {
    const supabase = await supabaseClient(token);
    
  
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("*, job:jobs(*,company:companies(name,logo_url))");
  
    if (error) {
      console.error('Error in Fetching Saved jobs:', error);
      return null;
    }
    return data;
  }
export async function saveJob(token,{alreadySaved},saveData){
    const  supabase = await supabaseClient(token);

    if(alreadySaved){
        const {data,error:deleteError} = await supabase
        .from("saved_jobs")
        .delete()
        .eq("job_id",saveData.job_id);

        if(deleteError){
            console.log("Error in Deleting Saved Jobs:",deleteError);
            return null;
        }
        return data;
    }else{
        const {data,error:InsertError} = await supabase
        .from("saved_jobs")
        .insert([saveData])
        .select()
        if(InsertError){
            console.log("Error in Inserting Jobs:",InsertError);
            return null;
        }
        return data;
    }
}
export async function getSingleJob(token,{job_id}){
    const  supabase = await supabaseClient(token);

    
        const {data,error:error} = await supabase
        .from("jobs")
        .select("*,company:companies(name,logo_url), applications:applications(*)")
        .eq("id",job_id)
        .single();
        if(error){
            console.log("Error in Fetching Jobs:",error);
            return null;
        }
        return data;
    }

    export async function updateHiringStatus(token, { job_id }, isOpen) {
        const supabase = await supabaseClient(token);
        
      
        const { data, error } = await supabase
          .from('jobs')
          .update({ isOpen })
          .eq('id', job_id)
          .select();
      
        if (error) {
          console.error('Error in Updating Jobs:', error);
          return null;
        }
        return data;
      }
      export async function addNewJob(token, _, jobData) {
        const supabase = await supabaseClient(token);
        
      
        const { data, error } = await supabase
          .from('jobs')
          .insert([jobData])
          .select();
      
        if (error) {
          console.error('Error in Creating job:', error);
          return null;
        }
        return data;
      }

      export async function getMyJobs(token,{recruiter_id}) {
        const supabase = await supabaseClient(token);
        
      
        const { data, error } = await supabase
          .from("jobs")
          .select("*, company:companies(name,logo_url)")
          .eq("recruiter_id",recruiter_id);
      
        if (error) {
          console.error('Error in Fetching jobs:', error);
          return null;
        }
        return data;
      }
      export async function deleteJob(token,{job_id}) {
        const supabase = await supabaseClient(token);
        
      
        const { data, error:deleteError } = await supabase
          .from("jobs")
          .delete()
          .eq("id",job_id)
          .select();
      
        if (deleteError) {
          console.error('Error in Deleting jobs:', error);
          return null;
        }
        return data;
      }