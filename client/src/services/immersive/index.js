import virtualCampusService from './virtualCampusService';
import vrSessionService from './vrSessionService';
import classroomService from './classroomService';
import digitalTwinService from './digitalTwinService';
import aiCompanionService from './aiCompanionService';
import credentialService from './credentialService';
import metaverseService from './metaverseService';
import collaborationService from './collaborationService';

export {
  virtualCampusService,
  vrSessionService,
  classroomService,
  digitalTwinService,
  aiCompanionService,
  credentialService,
  metaverseService,
  collaborationService
};

// Combined service for ease of use
const immersiveServices = {
  virtualCampus: virtualCampusService,
  vrSession: vrSessionService,
  classroom: classroomService,
  digitalTwin: digitalTwinService,
  aiCompanion: aiCompanionService,
  credential: credentialService,
  metaverse: metaverseService,
  collaboration: collaborationService
};

export default immersiveServices; 