'use strict';

var fs = require('fs'),
    path = require('path'),
    format = require('string-format');

function listAngularModules() {
    var modulesFolder = 'public/';
    // Add module choices
    return !fs.existsSync(modulesFolder) ? []: fs.readdirSync(modulesFolder).reduce(function(memo, folder) {
        var stat = fs.statSync(modulesFolder + '/' + folder);

        if (stat.isDirectory() && folder !== '_') {
            memo.push(folder);
        }
        return memo;
    }, []);
}

function listDjangoModules() {
    var modulesFolder = 'server/';
    // Add module choices
    return !fs.existsSync(modulesFolder) ? []: fs.readdirSync(modulesFolder).reduce(function(memo, folder) {
        var stat = fs.statSync(modulesFolder + '/' + folder);
        if (stat.isDirectory() && folder !== 'settings') {
            memo.push(folder);
        }
        return memo;
    }, []);
}

function readdirrecSync(location) {
    return fs.readdirSync(location).reduce(function (memo, file) {
        var relativePath = path.join(location, file);
        if (fs.statSync(relativePath).isDirectory() && file.indexOf('.') === 0){
            // do nothing
        }
        else if(fs.statSync(relativePath).isDirectory()){
            memo = memo.concat(readdirrecSync(relativePath));
        }
        else {
            memo.push(relativePath);
        }
        return memo;
    }, []);
}

function readFileAsString(filePath) {
    return fs.readFileSync(path.resolve(filePath), 'utf8');
}

function writeFileFromString(html, filePath) {
    fs.writeFileSync(path.resolve(filePath), html, 'utf8');
}

function replaceInFile(filePath, searchValue,replaceValue) {
    return writeFileFromString(readFileAsString(filePath).replace(searchValue, replaceValue), filePath);
}

function appendInFile(filePath, appendedValue) {
    return writeFileFromString(readFileAsString(filePath) + appendedValue, filePath);
}

module.exports = {
    listAngularModules: listAngularModules,
    listDjangoModules: listDjangoModules,
    readdirrecSync: readdirrecSync,
    readFileAsString: readFileAsString,
    writeFileFromString: writeFileFromString,
    replaceInFile: replaceInFile,
    appendInFile: appendInFile,
    regexes: {
        installedApps: /INSTALLED_APPS\s*=\s*(?:\(|\[)((?:.|\n|)*?)(?:\)|\])/i,
        urlpatterns: /urlpatterns\s*=\s*\[/i,
        leaveMePy: /#\s*leave me here\s*#/i,
        leaveMeJs: /\/\*\s*leave me here\s*\*\//i
    }
};

