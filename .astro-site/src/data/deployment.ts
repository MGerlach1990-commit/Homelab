export const installGuides = [
	{
		title: 'Debian',
		summary: 'Use these steps on Debian to install Docker Engine and the Compose plugin.',
		steps: [
			'Install the Docker APT repository and key.',
			'Install docker-ce, docker-ce-cli, containerd.io, and the Compose plugin.',
			'Enable the Docker service and optionally add your user to the docker group.',
		],
		commands: `sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
sudo usermod -aG docker $USER`,
	},
	{
		title: 'Ubuntu',
		summary: 'Use these steps on Ubuntu to install Docker Engine and the Compose plugin.',
		steps: [
			'Install the Docker APT repository and key for Ubuntu.',
			'Install the Docker packages and the Compose plugin.',
			'Enable the Docker service and optionally add your user to the docker group.',
		],
		commands: `sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
sudo usermod -aG docker $USER`,
	},
	{
		title: 'Raspberry Pi OS',
		summary: 'Raspberry Pi OS is Debian-based, so use the Debian instructions that match your Raspberry Pi architecture.',
		steps: [
			'Check whether your Raspberry Pi OS is 32-bit or 64-bit.',
			'Use the Debian instructions with the matching architecture, usually arm64 for 64-bit or armhf for 32-bit.',
			'After installation, enable the service and add your user to the docker group if needed.',
		],
		commands: `# Raspberry Pi OS is Debian-based.
# Follow the Debian instructions above and make sure the repository architecture
# matches your Raspberry Pi OS installation (arm64 or armhf).

sudo systemctl enable --now docker
sudo usermod -aG docker $USER`,
	},
	{
		title: 'Other Linux systems',
		summary: 'Use the official Docker Engine documentation for distributions that are not Debian-based.',
		steps: [
			'Follow the official Docker install guide for your distribution.',
			'Install the Docker Engine packages required by that system.',
			'Enable the Docker service and install the Compose plugin if it is not included.',
		],
		commands: `# Use the official Docker documentation for your distribution.
# The package names and repository setup depend on the operating system.
# https://docs.docker.com/engine/install/`,
	},
];

export const dockerfileLineSteps = [
	'<code>FROM node:22-alpine AS build</code> starts a build stage with Node.js 22 on Alpine Linux and names that stage <code>build</code>.',
	'<code>WORKDIR /app</code> sets the working directory inside the container to <code>/app</code>.',
	'<code>COPY package*.json ./</code> copies the package files first so Docker can reuse the dependency layer when source files change.',
	'<code>RUN npm ci</code> installs the dependencies exactly as they are defined in the lockfile.',
	'<code>COPY . .</code> copies the rest of the project files into the container.',
	'<code>RUN npm run build</code> builds the Astro site and creates the production files in <code>/app/dist</code>.',
	'<code>FROM nginx:1.27-alpine</code> starts a new final image based on Nginx, which will serve the built site.',
	'<code>COPY --from=build /app/dist /usr/share/nginx/html</code> copies the compiled site from the build stage into the Nginx web root.',
	'<code>EXPOSE 80</code> documents that the container listens on port 80.',
	'<code>CMD ["nginx", "-g", "daemon off;"]</code> starts Nginx in the foreground so the container keeps running.',
];

export const composeBuildLineSteps = [
	'<code>services:</code> tells Compose that the file contains one or more services to run.',
	'<code>web:</code> names the service that will run the website container.',
	'<code>build:</code> says that Compose should build the image locally instead of downloading one.',
	'<code>context: .</code> tells Docker to use the current project folder as the build context.',
	'<code>dockerfile: Dockerfile</code> tells Docker which Dockerfile to use for the build.',
	'<code>ports:</code> defines which container port should be published on the host machine.',
	'<code>- "8080:80"</code> maps host port 8080 to container port 80 so the site is reachable in the browser.',
	'<code>restart: unless-stopped</code> tells Docker to keep the container running unless you stop it manually.',
];

export const composeImageLineSteps = [
	'<code>services:</code> tells Compose that the file contains services to start.',
	'<code>web:</code> names the service that will serve the website.',
	'<code>image: nginx:1.27-alpine</code> uses the official Nginx image instead of building a custom one.',
	'<code>ports:</code> makes the container available on the host machine.',
	'<code>- "8080:80"</code> maps host port 8080 to container port 80.',
	'<code>volumes:</code> mounts files from the host into the container.',
	'<code>- ./dist:/usr/share/nginx/html:ro</code> serves the built site from the local <code>dist</code> folder as read-only.',
	'<code>restart: unless-stopped</code> keeps the service running unless you stop it manually.',
];

export const storageTypeSteps = [
	'<strong>Bind mounts</strong> like <code>./dist:/usr/share/nginx/html:ro</code> link a folder from your computer into the container. They are easy to inspect and change, which makes them useful for development or for serving already-built static files.',
	'<strong>Named volumes</strong> like <code>mydata:/var/lib/app</code> are managed by Docker. They are a good choice when you want persistent data but do not want to depend on a specific host path.',
	'<strong>Anonymous volumes</strong> like <code>/var/lib/app</code> let Docker create a storage location automatically. They work for temporary data, but they are harder to track and reuse later.',
	'<strong>tmpfs mounts</strong> keep data only in memory. They are useful for caches or other data that should disappear when the container stops.',
];

export const networkTypeSteps = [
	'<strong>Default network</strong> is created automatically by Docker Compose. Services in the same Compose file can reach each other by service name, such as <code>web</code> or <code>db</code>.',
	'<strong>Custom bridge networks</strong> let you separate groups of containers or give them clearer names and aliases.',
	'<strong>External networks</strong> connect a Compose project to a network that already exists on the host. This is useful when another stack or reverse proxy is already running there.',
	'<strong>Internal networks</strong> keep traffic inside the Compose project so services are not reachable from outside that network.',
];

export const dependsOnSteps = [
	'<code>web</code> is the service you want to start first after its dependency is available.',
	'<code>depends_on:</code> tells Compose that <code>web</code> needs <code>db</code> to be started first.',
	'<code>db</code> is the database service that the web service depends on.',
	'<code>ports:</code> publishes the web server on port 8080 so you can reach it in the browser.',
	'<code>environment:</code> passes the database password into the Postgres container.',
];

export const withoutDependsOnTips = [
	'<strong>When this fits:</strong> Each service has its own job and can run on its own.',
	'<strong>Example idea:</strong> A website container plus a separate maintenance or backup container.',
];

export const withDependsOnTips = [
	'<strong>When this fits:</strong> The app needs the database service started first.',
	'<strong>Important:</strong> <code>depends_on</code> sets startup order only, not full readiness.',
	'<strong>Best practice:</strong> Add health checks and retry logic if the app must wait for a truly ready database.',
];
