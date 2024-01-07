#!/usr/bin/env node
import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-commands/help.js';
import VersionCommand from './core/cli-commands/version.js';
import ImportCommand from './core/cli-commands/import.js';
import GenerateCommand from './core/cli-commands/generate.js';
import 'reflect-metadata';

const cliApplication = new CLIApplication();
cliApplication.registerCommands([new HelpCommand, new VersionCommand, new ImportCommand, new GenerateCommand]);
cliApplication.processCommand(process.argv);
