import { jira } from '../config';

exports.dailyReport = (req, res, next) => {
    jira.getBoardIssuesForSprint(req.params.boardId, req.params.sprintId , 0, 50,'issueType != "Bug"', true)
    .then(data => {
        let stories = data.issues.filter(story => {
            return story.fields.issuetype.name == 'Story';
        });
        let subTasks = data.issues.filter(story => {
            return story.fields.issuetype.name == 'Sub-task';
        });

        let reportStories = stories.map( story => {
            return {
                'id': story.id,
                'name': story.fields.summary,
                'point': story.fields.customfield_10002,
                'progress':story.fields.aggregateprogress,
                'assignee': story.fields.assignee,
                'status': story.fields.status
            }
        });
        let reportsSubTasks = subTasks.map(subtask => {
            if(subtask.fields.worklog){
                var worklogs = subtask.fields.worklog.worklogs.filter(worklog => new Date(worklog.updated).toDateString() == new Date('2019-02-25').toDateString());
                if(worklogs.length > 0){
                    return {...subtask, worklogs}
                }
            }
        });

        reportsSubTasks = reportsSubTasks.map(subtask => subtask && ({
            'id':subtask.id,
            'name': subtask.fields.summary,
            'progress': subtask.fields.aggregateprogress,
            'assignee': subtask.fields.assignee,
            'worklog': subtask.worklogs,
            'status': subtask.fields.status,
        }));

        let finalReport = {reportStories, reportsSubTasks};
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(finalReport));
    })

    .catch(err => {
        console.error(err);
    });
}

exports.weeklyReport = (req, res, next) => {
    let boardId = req.params.boardId;
    let sprintId = req.params.sprintId;
    let today = new Date('2018-10-17');

    let dateInWeekArray = [];
    let dateArray = [];
    let stories  = [];
    let weekReport = [];

    jira.getBoardIssuesForSprint(boardId, sprintId, 0, 50,'issueType = "Story"', true)
    .then(data => {
        data.issues.map(issue => {        
            let reportDate = new Date (issue.fields.updated);
            let indexDay = reportDate.getDay();

            if (reportDate.toDateString() == today.toDateString()) {                   
                for (let day = 0; day <= indexDay; day ++){
                    let datePre = new Date(reportDate);
                    datePre.setDate(reportDate.getDate() - day);
                    dateArray.push(datePre.toDateString());
               }
            }
           
            dateInWeekArray = Array.from(new Set(dateArray));
            if (dateInWeekArray) {
                for (let date = 0; date < dateInWeekArray.length; date ++) {
                    if (reportDate.toDateString() == dateInWeekArray[date]) {
                        stories.push(issue);                    
                    }
                }
                weekReport = stories.map(story => {
                    return {
                        'id': story.id,
                        'name': story.fields.summary,
                        'point': story.fields.customfield_10002,
                        'progress':story.fields.aggregateprogress,
                        'assignee': story.fields.assignee,
                        'status': story.fields.status
                    }
                });               
            }
        })
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(weekReport));
    })
    .catch(err => {
        console.error(err);
    });
}
