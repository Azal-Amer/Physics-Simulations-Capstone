import random
import math
import bpy
import time,math,random,json,os
from math import remainder

from math import cos,sin,pi
from numpy import arange,array,empty
#how many cubes you want to add

cache = open("/Users/amer_/Documents/GitHub/Physics-Simulations-Capstone/Coupled Oscilation Site/Python/coupled-oscillation.ipynb")
worlds = {}


black = bpy.data.materials.new(name="Red")
black.diffuse_color = (1, 1, 0,1)
white = bpy.data.materials.new(name="Blue")
white.diffuse_color = (1, 0, 0,1)

worlds = json.load(cache)

count = worlds['Count']
print(count)

FrameCount = worlds['FrameCount']

#D = bpy.data
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete() 

for n in range(0,count):    
    coordinates = (worlds["frames"][0][n])
    bpy.ops.mesh.primitive_cube_add(location=((coordinates)/4+10*n-5,0,0),size = .5)
bpy.ops.object.select_all(action="SELECT")

#for i in range(int(FrameCount/skip)):
n = 0
  #  print(n)

for object in bpy.context.selected_objects:
    if n%2 == 0:
        object.data.materials.append(black)
    else:
        object.data.materials.append(white)
    print(n)
    bpy.ops.object.select_all(action="SELECT")
    x_cord = []
    y_cord =[]
    z_cord = []
    for j in range(FrameCount):
        x_cord.append(1*n)
        y_cord.append(0)
        z_cord.append((worlds['frames'][j][n]))

    frames = range(1, FrameCount-1)
    # some action
    a = bpy.data.actions.new(str(n)+'x')
    # b = bpy.data.actions.new(str(n)+'y')
    fc_x = a.fcurves.new("location", index=0, action_group ="LocX")
    fc_y = a.fcurves.new("location", index=1, action_group ="LocY")
    fc_z = a.fcurves.new("location", index=2, action_group ="LocZ")
    fc_x.keyframe_points.add(count=len(frames))
    fc_y.keyframe_points.add(count=len(frames))
    fc_z.keyframe_points.add(count=len(frames))

    
    # populate points


    fc_x.keyframe_points.foreach_set("co", 
            [x for co in zip(frames, x_cord) for x in co])
    fc_y.keyframe_points.foreach_set("co", 
            [x for co in zip(frames, y_cord) for x in co])
    fc_z.keyframe_points.foreach_set("co", 
            [x for co in zip(frames, z_cord) for x in co])
    
# update 
    fc_x.update()
    fc_y.update()
    fc_z.update()
# assign to context ob
    ad = object.animation_data_create()
    ad.action = a
    fc_x.convert_to_samples(1, FrameCount-1) 
    fc_y.convert_to_samples(1, FrameCount-1) 
    fc_z.convert_to_samples(1,FrameCount-1)
    n += 1




