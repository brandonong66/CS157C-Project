const roleKeywords = {
  "Frontend Web Developer": [
    "javascript",
    "css",
    "html",
    "react",
    "angular",
    "vue",
  ],
  "Backend Web Developer": [
    "nodejs",
    "express",
    "python",
    "django",
    "flask",
    "ruby",
    "rails",
    "php",
    "laravel",
  ],
  "Full Stack Developer": [
    "javascript",
    "css",
    "html",
    "nodejs",
    "python",
    "ruby",
    "php",
    "react",
    "angular",
    "vue",
    "django",
    "flask",
    "rails",
    "laravel",
  ],
  "Data Scientist": [
    "python",
    "r",
    "pandas",
    "numpy",
    "statistics",
    "data analysis",
    "machine learning",
    "tensorflow",
    "keras",
    "scikit-learn",
  ],
  "Database Administrator": [
    "sql",
    "mysql",
    "postgresql",
    "oracle",
    "mssql",
    "database",
    "nosql",
    "mongodb",
    "cassandra",
    "db2",
  ],
  "Information Security Analyst": [
    "security",
    "cryptography",
    "firewall",
    "penetration testing",
    "vulnerability assessment",
    "owasp",
    "cissp",
    "ceh",
    "network security",
  ],
  "DevOps Engineer": [
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",
    "jenkins",
    "terraform",
    "ansible",
    "ci/cd",
    "linux",
  ],
  "Network Engineer": [
    "networking",
    "cisco",
    "ccna",
    "ccnp",
    "routing",
    "switching",
    "tcp/ip",
    "vpn",
    "firewall",
    "subnetting",
  ],
  "Software Tester": [
    "testing",
    "qa",
    "quality assurance",
    "junit",
    "selenium",
    "test automation",
    "regression testing",
    "test cases",
    "bug tracking",
  ],
  "Technical Support Specialist": [
    "tech support",
    "help desk",
    "troubleshooting",
    "windows",
    "macos",
    "linux",
    "customer service",
    "hardware",
    "software",
  ],
  "Mobile App Developer": [
    "ios",
    "android",
    "swift",
    "objective-c",
    "kotlin",
    "java",
    "mobile",
    "xamarin",
    "flutter",
    "react native",
  ],
  "Embedded Systems Engineer": [
    "embedded",
    "c",
    "c\\+\\+",
    "microcontroller",
    "firmware",
    "hardware",
    "real-time",
    "rtos",
    "arduino",
    "raspberry pi",
  ],
  "Game Developer": [
    "game development",
    "unity",
    "unreal engine",
    "c#",
    "c\\+\\+",
    "3d",
    "2d",
    "graphics",
    "physics",
    "animation",
  ],
  "UX/UI Designer": [
    "ui",
    "ux",
    "user interface",
    "user experience",
    "wireframe",
    "prototype",
    "design",
    "adobe xd",
    "sketch",
    "figma",
  ],
  "Data Engineer": [
    "data engineering",
    "big data",
    "hadoop",
    "spark",
    "python",
    "scala",
    "java",
    "kafka",
    "hive",
    "etl",
  ],
}

function calculateRoleScores(resumeText) {
  const scores = {}
  let totalKeywords = 0

  for (const role in roleKeywords) {
    let count = 0
    const keywords = roleKeywords[role]

    keywords.forEach((keyword) => {
      const regex = new RegExp("\\b" + keyword + "\\b", "gi")
      const keywordCount = (resumeText.match(regex) || []).length
      count += keywordCount
      totalKeywords += keywordCount
    })

    scores[role] = count
  }

  if (totalKeywords > 0) {
    for (const role in scores) {
      scores[role] /= totalKeywords
    }
  }

  return scores
}

module.exports = {
  calculateRoleScores,
}
