import {
  Category,
  CategoryServiceFactory,
  CategoryConfiguration,
  LogLevel,
  AbstractCategoryLogger,
  RuntimeSettings,
  CategoryLogMessage,
  CategoryLogFormat,
  LoggerType
} from "typescript-logging";
import config from 'config';
import * as fileSystem from 'fs';
import path from 'path';
/**
 * custom logger, we want to write into a file in production envirronement
 */
class CustomLogger extends AbstractCategoryLogger {
    /**
     * get the environnement of the application
     */
    private environnement : string;
    // The first two parameters are required, the 3rd is our parameter
    // where we give this logger an array and log all messages to that array.
    constructor(category: Category, runtimeSettings: RuntimeSettings) {
      super(category, runtimeSettings);
      this.environnement = process.env.NODE_ENV;
    }

    /**
     *
     * @returns the name of the file for the log now
     */
    private getNameOfFile() : string {
        const date = new Date(Date.now());
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + ".log";
    }

    /**
     *
     * @param name the name of the file
     * @returns the date of the log
     */
    private getDateFromName(name : string) : Date {
        const indexExtension = name.lastIndexOf(".");
        const nameWithoutExt = name.substr(0, indexExtension - 1);

        // calcul des paramettre de date
        const tabSplit : string[] = nameWithoutExt.split("-");
        const date = new Date();

        date.setFullYear(parseInt(tabSplit[0], 10), parseInt(tabSplit[1], 10) - 1, parseInt(tabSplit[2], 10));

        return date;
    }

    protected doLog(msg: CategoryLogMessage): void {
      if(this.environnement === "production"){// sinon on écrit dans un fichier
        const nameOfFolder : string = path.join(process.env.PROJECT_ROOT, config.get("log.folder"));
        if(msg.level === LogLevel.Warn || msg.level === LogLevel.Error || msg.level === LogLevel.Fatal)
        {
            /* tslint:disable:no-shadowed-variable  no-empty no-console*/
            if (!fileSystem.existsSync(nameOfFolder)) {// create folder if it doesn't exist
                fileSystem.mkdir(nameOfFolder, function(err) {if(err){}else{}});
            }

            console.log(this.createDefaultLogMessage(msg));

            fileSystem.access(nameOfFolder, fileSystem.constants.F_OK, (err) => {
                if(err){ // si le dossier n'exist pas, on le cree
                    fileSystem.mkdirSync(nameOfFolder);
                }
                fileSystem.readdir(nameOfFolder, (err, files) => {// check le nombre de fichiers
                    if (err) {
                        // throw new Error("Can't read folder for log : " + nameOfFolder);
                    } else {
                        const pathOfFile = path.join(nameOfFolder, this.getNameOfFile());

                        // creer le fichier si il n'existe pas et ecris a la derniere ligne le msg
                        fileSystem.appendFile(pathOfFile, this.createDefaultLogMessage(msg) + "\n\n\n", (err) => {
                            if(err){
                                // throw new Error("Cannot write log into " + pathOfFile);
                            }
                        });

                        // si on a trop de fichier on supprime le plus ancien
                        if(files.length > config.get("log.nbFileMax")){
                            let indexOld : number = 0;
                            for(let i = 1 ; i < files.length ; i++){
                                if(this.getDateFromName(files[indexOld]) > this.getDateFromName(files[i])) indexOld = i;
                            }

                            const pathOfOldFile = path.join(nameOfFolder, files[indexOld]);

                            fileSystem.rm(pathOfOldFile, (err) => {
                                if(err){
                                    // throw new Error("Cannot remove file " + pathOfOldFile);
                                }
                            })
                        }
                    }
                });
            });
            /* tslint:enable:no-shadowed-variable  no-empty no-console*/
        }
      }else{// si on est en dev, on prends le normal
        // copier/coller de CategoryConsoleLoggerImpl.js du module typescript-logging
        if (console !== undefined) {
          const messageFormatter = this._getMessageFormatter();
          let fullMsg : string;
          if (messageFormatter === null) {
              fullMsg = this.createDefaultLogMessage(msg);
          }
          else {
              fullMsg = messageFormatter(msg);
          }
          let logged = false;
          /* tslint:disable:no-console */
          switch (msg.level) {
              case LogLevel.Trace:
                  // Don't try trace we don't want stacks
                  break;
              case LogLevel.Debug:
                  // Don't try, too much differences of consoles.
                  break;
              case LogLevel.Info:
                  if (console.info) {
                      console.info(fullMsg);
                      logged = true;
                  }
                  break;
              case LogLevel.Warn:
                  if (console.warn) {
                      console.warn(fullMsg);
                      logged = true;
                  }
                  break;
              case LogLevel.Error:
              case LogLevel.Fatal:
                  if (console.error) {
                      console.error(fullMsg);
                      logged = true;
                  }
                  break;
              default:
                  throw new Error("Unsupported level: " + msg.level);
          }
          if (!logged) {
              console.log(fullMsg);
          }
          /* tslint:enable:no-console */
      }
      else {
          throw new Error("Console is not defined, cannot log msg: " + msg.messageAsString);
      }
    }
  }
}

// use the custom logger
const configForLogger = new CategoryConfiguration(
  LogLevel.Debug, LoggerType.Custom, new CategoryLogFormat(),
 (category: Category, runtimeSettings: RuntimeSettings) => new CustomLogger(category, runtimeSettings)
);
CategoryServiceFactory.setDefaultConfiguration(configForLogger);

/////////////////////////////////////////////////////////
// categorie of logger
/////////////////////////////////////////////////////////

// default logger
export const logDefault = new Category("Default");

////////////////////////////////////////////////////////
// global
////////////////////////////////////////////////////////

const logGlobal = new Category("Global");

// startup
export const logStartup = new Category("Startup", logGlobal);

// routeur
export const logRouteur = new Category("Routeur", logGlobal);
export const logRouteurApi = new Category("RouteurApi", logRouteur);

// parse
export const logInput = new Category("Input", logGlobal);

////////////////////////////////////////////////////////
// Item
////////////////////////////////////////////////////////

export const logItemImpl = new Category("ItemImpl");


export const logItemImplReadside = new Category("ItemImpl.Readside", logItemImpl);
export const logItemImplWriteside = new Category("ItemImpl.Writeside", logItemImpl);


// connection
export const logConnection = new Category("Connection");



