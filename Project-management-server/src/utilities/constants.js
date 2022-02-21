import config from "../conf";

export const ROLES = {
  ADMIN: 1,
  DEVELOPER: 2,
  TESTER: 3,
  PROJECT_MANAGER: 4,
};

export const TRANSACTION_FILTER = {
    DAILY: 1,
    WEEKLY: 2,
    MONTHLY: 3,
    YEARLY: 4,
}

export const FILE_TYPE = {
  PROJECT: config.paths['projectFilePath'],
  MODULES: config.paths['modulesFilePath'],
  SPECIFICATION: config.paths['specificationFilePath']
}