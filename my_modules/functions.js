module.exports.route = (title)=>{
    
    return "/" + title.trim().replace(/\s/g, "-").toLowerCase();
}
module.exports.shortText = (text) =>{
    return text.slice(0, 100) + "..."
}   