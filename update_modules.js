const fs = require('fs');

// Read the app.module.ts file
fs.readFile('src/app/app.module.ts', 'utf8', (err, data) => {
    if (err) throw err;

    // Extract the new component name
    const componentName = getComponentName(data);
    if (!componentName) {
        console.log('No new component found.');
        return;
    }

    // Read the app-routing.module.ts file
    fs.readFile('src/app/app-routing.module.ts', 'utf8', (err, data) => {
        if (err) throw err;

        // Add the new component to the routes array
        const newData = addComponentToRoutes(data, componentName);

        // Update the app-routing.module.ts file
        fs.writeFile('src/app/app-routing.module.ts', newData, 'utf8', (err) => {
            if (err) throw err;

            console.log(`${componentName} added to app-routing.module.ts`);
        });
    });
});

function getComponentName(data) {
    // Use regular expression to extract the component name
    const match = data.match(/[A-Z][a-zA-Z]+Component/);
    if (!match) return null;
    return match[0];
}

function addComponentToRoutes(data, componentName) {
    // Use regular expression to find the routes array
    const routesRegex = /const routes: Routes = \[[\s\S]*?];/;
    const match = data.match(routesRegex);
    if (!match) return data;

    // Add the new component to the routes array
    const newRoute = `  { path: '${componentName.toLowerCase()}', component: ${componentName} },\n`;
    return data.replace(routesRegex, match[0] + newRoute);
}

