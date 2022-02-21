import {sequelize} from '../database/config'
import Sequelize from 'sequelize';

export const CountryModel = sequelize.define('pm_country', {
  short_name: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  code: {
    type: Sequelize.STRING
  }
});

export const UserModel = sequelize.define('pm_user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  fname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gender: {
    type: Sequelize.ENUM('male', 'female', 'other'),
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true,
    validate: {
        isEmail: true,
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mobile: {
    type: Sequelize.STRING,
  },
  home: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  },
  isactive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  address: {
    type: Sequelize.STRING
  },
  cityid: {
    type: Sequelize.INTEGER,
  },
  countryid: {
    type: Sequelize.INTEGER,
  },
  address1: {
      type: Sequelize.STRING,
  },
  zipcode: {
      type: Sequelize.STRING,
  },
  stateid: {
    type: Sequelize.INTEGER,
  },
  createdby: {
    type: Sequelize.INTEGER,
  },
  modifiedby: {
    type: Sequelize.INTEGER,
  },
});

export const StateModel = sequelize.define('pm_state', {
    name: {
        type: Sequelize.STRING
    },
    country_id: {
        type: Sequelize.INTEGER,
    }
  }
);

export const CityModel = sequelize.define('pm_city', {
    name: {
        type: Sequelize.STRING
    },
    state_id: {
        type: Sequelize.INTEGER,
    }
  }
);

export const UserRoleModel = sequelize.define('pm_user_role', {
    userid: {
        type: Sequelize.INTEGER
    },
    roleid: {
        type: Sequelize.INTEGER,
    },
    assignedby: {
        type: Sequelize.INTEGER,
    }
  }
);

export const Roles = sequelize.define('pm_role', {
    slug: {
        type: Sequelize.STRING,
    }
  }
);

export const ProjectModel = sequelize.define('pm_project', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    subtype: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    startdate: {
        type: Sequelize.STRING
    },
    enddate: {
        type: Sequelize.STRING
    },
    createdby: {
        type: Sequelize.INTEGER
    },
});

export const ModuleModel = sequelize.define('pm_module', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    projectid: {
        type: Sequelize.INTEGER
    },
    createdby: {
        type: Sequelize.INTEGER
    }
});


export const ProjectReleaseModel = sequelize.define('pm_project_release', {
    title: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    startdate: {
        type: Sequelize.STRING
    },
    enddate: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    releasenote: {
        type: Sequelize.STRING
    },
    projectid: {
        type: Sequelize.INTEGER
    },
    code: {
        type: Sequelize.STRING
    },
    createdby: {
        type: Sequelize.INTEGER
    },
    updatedby: {
        type: Sequelize.INTEGER
    },
});

export const ProjectBuildModel = sequelize.define('pm_project_build', {
    title: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    builddate: {
        type: Sequelize.STRING
    },
    buildnote: {
        type: Sequelize.STRING
    },
    releaseid: {
        type: Sequelize.INTEGER
    },
    projectid: {
        type: Sequelize.INTEGER
    },
    createdby: {
        type: Sequelize.INTEGER
    }
});

export const ProjectRequirementsModel = sequelize.define('pm_project_requirement', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.ENUM('inprogress', 'pending', 'completed', 'dispatched'),
    },
    priority: {
        type: Sequelize.ENUM('high', 'med', 'low'),
    },
    priority: {
        type: Sequelize.STRING,
    },
    assigneeid: {
        type: Sequelize.INTEGER
    },
    moduleid: {
        type: Sequelize.INTEGER
    },
    createdby: {
        type: Sequelize.INTEGER
    }
});

export const ResourcesModel = sequelize.define('pm_resources', {
    filename: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    resourceid: {
        type: Sequelize.INTEGER
    },
    createdby: {
        type: Sequelize.INTEGER
    }
});



//  CountryModel.sync().then(res => {
//      if(res){
//          console.log('Country table created..');
//          CityModel.sync().then(res => {
//              if(res){
//                  console.log('City table created..');
//                  UserModel.sync().then(res => {
//                      if(res){
//                          console.log('User table created..');
//                          UserRoleModel.sync().then(res => {
//                            if(res){
//                              Roles.sync().then(res => {
//                                  if(res){
//                                    console.log('Role Table created..');
//                                    StateModel.sync().then(res => {
//                                        if(res){
//                                            console.log('States Table created..');
//                                            ProjectModel.sync().then(res => {
//                                                if(res){
//                                                    console.log('Project Table created..');
//                                                    ModuleModel.sync().then(res => {
//                                                        if(res){
//                                                            console.log('Module Table created..');
//                                                            ProjectRequirementsModel.sync().then(res => {
//                                                                if(res){
//                                                                    console.log('Project Requirements Table created..');
//                                                                    ProjectReleaseModel.sync().then(res => {
//                                                                         if(res){
//                                                                             console.log('Project Release Table created..');
//                                                                             ProjectBuildModel.sync().then(res => {
//                                                                                 if(res){
//                                                                                     console.log('Project Build Table created..');
//                                                                                     ResourcesModel.sync().then(res => {
//                                                                                         if(res){
//                                                                                             console.log('Resources Table created..');
//                                                                                         }
//                                                                                     });
//                                                                                 }
//                                                                             });
//                                                                         }
//                                                                     });
//                                                                }
//                                                            });
//                                                        }
//                                                    });
//                                                }
//                                            });
//                                        }
//                                    });
//                                  }
//                              });
//                            }
//                        });
//                      }
//                  })
//              }
//          })
//      }
//  })
