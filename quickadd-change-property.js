// You have to export the function you wish to run.
// QuickAdd automatically passes a parameter, which is an object with the Obsidian app object
// and the QuickAdd API (see description further on this page).


//import {TFile} from "obsidian";


module.exports = async (params) => {
    // Original comment: Object destructuring. We pull inputPrompt out of the QuickAdd API in params.
    const {quickAddApi: {inputPrompt}} = params;
    // Original comment: Here, I pull in the update function from the MetaEdit API.
    const {update} = app.plugins.plugins["metaedit"].api;

    // create a yaml property (will not create dataview property, but will update any match with : or :: behind it in body of note)
    // bug: will remove colons from dataview properties
    const {createYamlProperty} = app.plugins.plugins["metaedit"].api;
    const {getPropertyValue} = app.plugins.plugins["metaedit"].api;
    
    // Get the filename of the active file
    const fileToChange = app.workspace.getActiveFile().path;

    // Get property to change
    const propertyToChange = await inputPrompt("Property to Change?");
    

    // Get the value of "book"
    const valueToSet = await getPropertyValue(propertyToChange, fileToChange)
    // If valBook exists, then go for update, else go for createYamlProperty
    if (valueToSet) {
        //Prompt user to input new value of property
        const valueToSet = await inputPrompt(propertyToChange);  
        // Invoke the MetaEdit update function on the Book property in my daily journal note.
        // It updates the value of Book to the value entered (val).
        await update(propertyToChange, valueToSet, fileToChange)
    } else {
        //Prompt user to input new value of property
        const valueToSet = await inputPrompt("No value - add it");  
        // if no book value, then create the property
        await createYamlProperty(propertyToChange, valueToSet, fileToChange)  

    }

    // This opens a prompt with the header "📖 Book Name". val will be whatever you enter.
    
    
    
    //await createYamlProperty("book", val, "_test/2021-08-19.md")
}