I decided to pick JavaScript, despite the instructions, as these will be the languages I will be using in my projects.

- Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by Google.

Javascript/React: ESlint, however Prettier can be used for formatting the code style and Styleint for CSS.

- What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask Google!

Teamcity, Gitlab, Travis CI

- Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

Whether CI is better in a self-hosted or cloud-based environment depends on factors such as team size, infrastructure resources, security needs, and cost considerations. Here’s an overview:
Self-Hosted Environment:

Pros:

    Customization and Control: Full control over infrastructure and configuration, allowing for specific security and compliance requirements to be met.
    Data Security: Greater assurance of data privacy, as all information stays within the organization’s own servers.
    Performance Optimization: Ability to tailor server resources to meet the precise needs of the CI/CD process.

Cons:

    Resource Intensive: Requires dedicated DevOps or IT teams to manage server maintenance, updates, and troubleshooting.
    Higher Initial Cost: Significant upfront investment in hardware and potential long-term operational costs.
    Scalability: Scaling can be more complex and slower, as it involves adding physical or virtual hardware.

Cloud-Based Environment:

Pros:

    Scalability and Flexibility: Quick scaling up or down based on project demands without manual infrastructure changes.
    Lower Maintenance Overhead: Managed by the service provider, reducing the operational burden on internal teams.
    Cost Efficiency: Pay-as-you-go models often make cloud-based solutions more budget-friendly for smaller teams or those with variable workloads.

Cons:

    Security Concerns: Data is stored on third-party servers, which may raise concerns for organizations with strict compliance standards.
    Limited Customization: Less flexibility in terms of specific configurations compared to self-hosted setups.

Decision Factors:

To decide between self-hosted and cloud-based environments, you need information about:

    Compliance and Security Requirements: Industries like finance and healthcare may prefer self-hosting due to stringent data protection laws.
    Team Expertise: If the team lacks the expertise to manage and maintain servers, a cloud-based solution might be preferable.
    Budget: Cloud services can be cost-effective for startups, while enterprises with larger budgets might benefit from the control offered by self-hosted setups.
    Workload and Scale: Projects requiring dynamic scaling might perform better in cloud-based environments.

Example Tools for Both Environments:

    Self-Hosted: Jenkins, TeamCity, GitLab CI/CD, and Bamboo.
    Cloud-Based: CircleCI, Travis CI, and GitHub Actions (with options for self-hosting)
