sounds like a graph problem
junction boxes are nodes
connections are edges
where the distance between them is the edge cost / weight

we want to: 
- have the largest graph (max number nodes),
- while minimizing the edge costs (distances)

nodes are distributed in 3D space
for each node, to get the closest other one, we'd need to compare each node to every other node
n^2
can we partition search space?
can we sort nodes? but by what?

connecting subgraphs

distance from a to b equals distance b to a
- combinations, not permutations

given set of n elements, how many combinations of r elements are possible? (order does not matter)
n! / ((n-r)! * r!)
-> for test input n=20, 190 combinations of 2 nodes
-> for puzzle input n=1000, 499.500 combinations of 2 nodes -.-

can we partition space and group nodes in quadrants or smthg?
sort by distance from center?
lists sorted by x / y / z axes?

pack nodes into buckets
keep track of bucket size (# of nodes per bucket)
start with densest bucket
search inside bucket and neighbouring buckets

octree? quadtree for 3d
(can we transform points into 2d space? worth it?)
https://gameprogrammingpatterns.com/spatial-partition.html


