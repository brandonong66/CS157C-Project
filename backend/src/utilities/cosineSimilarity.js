function dotProduct(vectorA, vectorB) {
  let sum = 0
  for (const key in vectorA) {
    if (vectorB.hasOwnProperty(key)) {
      sum += vectorA[key] * vectorB[key]
    }
  }
  return sum
}

function magnitude(vector) {
  let sum = 0
  for (const key in vector) {
    sum += vector[key] * vector[key]
  }
  return Math.sqrt(sum)
}

function cosineSimilarity(vectorA, vectorB) {
  const dotProd = dotProduct(vectorA, vectorB)
  const magA = magnitude(vectorA)
  const magB = magnitude(vectorB)
  return dotProd / (magA * magB)
}

module.exports = cosineSimilarity
