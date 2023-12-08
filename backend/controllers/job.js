// general view of all jobs
export const getJobs = (req, res) => {
    res.send("Jobs");
};
// view specific job
export const getJob = (req, res) => {
    res.send("Job");
};
// update specific job
export const updateJob = (req, res) => {
    res.send("Update Job");
};
// delete specific job
export const deleteJob = (req, res) => {
    res.send("Delete Job");
};
// new job upload
export const uploadJob = (req, res) => {
    res.send("Upload Job");
}