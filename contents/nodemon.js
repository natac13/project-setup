const nodemon = `
{
  "restartable": "rs",
  "ignore": [
    ".git",
    "node_modules/**/node_modules"
  ],
  "verbose": true,
  "execMap": {
    "js": "node"
  },
  "events": {
    "restart": "echo \"App restarted due to:\n'$FILENAME'\""
  },
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js json jsx css scss"
}
`;

export default nodemon