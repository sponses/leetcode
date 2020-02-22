/**
 * 207. 课程表（拓扑排序）
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  let inDegree = new Array(numCourses)
  inDegree.fill(0)
  for (let i = 0, len = prerequisites.length; i < len; i++) {
    inDegree[prerequisites[i][0]]++
  }
  let queue = []
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i)
  }
  let count = 0
  while (queue.length) {
    let temp = queue.pop()
    count++
    for (let i = 0, len = prerequisites.length; i < len; i++) {
      if (temp === prerequisites[i][1]) {
        inDegree[prerequisites[i][0]]--
        if (inDegree[prerequisites[i][0]] === 0) queue.push(prerequisites[i][0])
      }
    }
  }
  return count === numCourses
}
